import React, { useState, useEffect, useMemo } from "react";
import { request } from "strapi-helper-plugin";
import { Table, Padded, Flex, Button } from "@buffetjs/core";
import { LoadingBar } from "@buffetjs/styles";
import moment from "moment";
import { Block, StatusWrapper } from "./components";

const DATETIME_FORMAT = "DD.MM.YYYY HH:mm:ss";

const Deployments = ({ refreshCount }) => {
  const [deploymentsState, refresh] = useDeployments();
  const { error, isLoading, deployments: allDeployment } = deploymentsState;

  useEffect(() => {
    if (refreshCount > 0) refresh();
  }, [refreshCount]);

  const latestDeploy = useMemo(() => {
    if (Array.isArray(allDeployment) && allDeployment.length > 0)
      return allDeployment[0];
    return null;
  }, [allDeployment]);

  const deployments = useMemo(() => {
    if (Array.isArray(allDeployment) && allDeployment.length > 0)
      return allDeployment.slice(1);
    return [];
  }, [allDeployment]);

  if (isLoading) {
    return (
      <Padded bottom size="md">
        <LoadingBar />
      </Padded>
    );
  }

  if (error) return <Block>Error occured during fetching deployments</Block>;

  return (
    <>
      <DeploymentLast deployment={latestDeploy} />
      <DeploymentList deployments={deployments} />
    </>
  );
};

const DeploymentList = (props) => {
  const { deployments } = props;

  if (!deployments || deployments.length === 0) {
    return (
      <Padded bottom size="md">
        <p>No deployments, make your first deploy</p>
      </Padded>
    );
  }

  const headers = [
    {
      name: "DATE",
      value: "created",
      cellFormatter(name, row) {
        return moment(row.created).format(DATETIME_FORMAT);
      },
    },
    {
      name: "URL",
      value: "url",
      cellAdapter(row) {
        return (
          <a href={row.url} target="_blank">
            {row.url}
          </a>
        );
      },
    },
    {
      name: "STATE",
      value: "state",
      cellAdapter(row) {
        return <StatusWrapper state={row.state}>{row.state}</StatusWrapper>;
      },
    },
    {
      name: "TARGET",
      value: "target",
    },
  ];

  return (
    <>
      <Padded bottom size="md">
        <Table
          headers={headers}
          rows={deployments}
          onClickRow={(e, data) => {
            window.open(urlize(data.url), "_blank");
          }}
        />
      </Padded>
    </>
  );
};

const DeploymentLast = ({ deployment: deploy }) => {
  if (!deploy) return <Block>No last deployment found</Block>;

  const [state, reFresh] = useDeployment({ id: deploy.uid });
  const { error, isLoading, deployment } = state;

  // // keep Waiting if does not READY
  useEffect(() => {
    if (deployment && deployment.readyState !== "READY") {
      setTimeout(() => reFresh(), 2000);
    }
  }, [deployment]);

  if (isLoading) {
    return (
      <Padded bottom size="md">
        <LoadingBar />
      </Padded>
    );
  }

  if (error)
    return <Block>Error occured during fetching last deployment</Block>;

  return (
    <Block>
      <Flex alignItems="center">
        <div className="mr-4">
          {deployment.readyState === "READY" ? (
            <a
              href={urlize(deployment.url)}
              target="_blank"
              style={{ width: "400px", height: "250px", display: "block" }}
            >
              <img
                height="250"
                title={deployment.url}
                alt={deployment.url}
                src={`https://api.microlink.io?url=${urlize(
                  deployment.url
                )}&screenshot=true&meta=false&embed=screenshot.url`}
              />
            </a>
          ) : (
            <div className="waiting">Waiting for deployment to finish...</div>
          )}
        </div>
        <div>
          <div className="mb-4">
            <div className="label">DEPLOYMENT</div>
            <div>
              <a href={urlize(deployment.url)} target="_blank">
                {deployment.url}
              </a>
            </div>
          </div>
          <div className="mb-4">
            <div className="label">DOMAINS</div>
            <div>
              {deployment.alias.map((alias) => (
                <div key={alias}>
                  <a href={urlize(alias)} target="_blank">
                    {alias}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <div className="label">STATE</div>
            <div>
              <StatusWrapper state={deployment.readyState}>
                {deployment.readyState}
              </StatusWrapper>
              {deployment.readyState === "READY" ? (
                ` (${moment(deployment.ready).format(DATETIME_FORMAT)})`
              ) : (
                <LoadingBar />
              )}
            </div>
          </div>
          <div className="mb-4">
            <div className="label">CREATED</div>
            <div>{moment(deployment.createdAt).format(DATETIME_FORMAT)}</div>
          </div>
          <div>
            <div className="label">TARGET</div>
            <div>{deployment.target}</div>
          </div>
        </div>
      </Flex>
    </Block>
  );
};

const DeployButton = ({ onDeploy = () => {}, targets = ["production"] }) => {
  const [state, setState] = useState({
    loading: false,
  });

  const onClick = async (target) => {
    setState({ loading: true });
    await deploy(target);
    setTimeout(() => {
      setState({ loading: false });
      onDeploy();
    }, 1000);
  };

  return (
    <div>
      <div>
        {targets.map((target, key) => (
          <Button
            key={key}
            className="mx-2"
            color="success"
            type="submit"
            disabled={state.loading}
            onClick={() => onClick(target)}
          >
            Deploy {target}
          </Button>
        ))}
      </div>
      {state.loading && <LoadingBar className="w-100" />}
    </div>
  );
};

const useDeployments = () => {
  const [isMount, setIsMount] = useState(true);
  const [state, setState] = useState({
    error: null,
    isLoading: true,
    deployments: [],
  });

  const fetchData = async () => {
    try {
      const { deployments } = await request("/vercel/deployments", {
        method: "GET",
      });
      if (isMount) setState({ isLoading: false, deployments, error: null });
    } catch (e) {
      strapi.notification.error("notification.error");
      setState({ isLoading: false, error: e, deployments: [] });
    }
  };

  useEffect(() => {
    fetchData();
    return () => setIsMount(false);
  }, []);

  return [state, fetchData];
};

const useDeployment = ({ id }) => {
  const [state, setState] = useState({
    error: null,
    isLoading: true,
    deployment: null,
  });

  const fetchData = async () => {
    try {
      const data = await request(`/vercel/deployments/${id}`, {
        method: "GET",
      });
      setState({ isLoading: false, deployment: data, error: null });
    } catch (e) {
      strapi.notification.error("notification.error");
      setState({ isLoading: false, error: e, deployment: null });
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return [state, fetchData];
};

const deploy = async (target) => {
  try {
    const data = await request(`/vercel/deploy/${target}`, {
      method: "POST",
    });
    return data;
  } catch (e) {
    strapi.notification.error("notification.error");
  }
};

const urlize = (url) => {
  return `https://${url}`;
};

export { Deployments, DeployButton };
