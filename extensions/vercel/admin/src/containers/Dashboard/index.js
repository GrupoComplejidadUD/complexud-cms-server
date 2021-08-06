import React, { memo, useState } from "react";
import { Padded } from "@buffetjs/core";
import { Header } from "@buffetjs/custom";
import { Deployments, DeployButton } from "../../view";

const Dashboard = () => {
  const [refreshCount, setRefreshCount] = useState(0);
  const increaseCount = () => setRefreshCount(refreshCount + 1);

  return (
    <>
      <Padded top right left size="md">
        <Header
          title={{ label: "Vercel Dashboard" }}
          actions={[
            {
              Component: () => (
                <DeployButton
                  onDeploy={increaseCount}
                  targets={["develop", "production"]}
                />
              ),
            },
          ]}
        />
      </Padded>
      <Padded right left size="md">
        <Deployments refreshCount={refreshCount} />
      </Padded>
    </>
  );
};

export default memo(Dashboard);
