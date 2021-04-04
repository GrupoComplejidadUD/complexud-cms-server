import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Flex, Padded } from "@buffetjs/core";
import { useGlobalContext, HeaderNav } from "strapi-helper-plugin";
import { camelCase } from "lodash";

import SocialShare from "../common/SocialShare";
import Notice from "../feedback/Notice";

import Box from "../layout/Box";
import Spacer from "../layout/Spacer";

import basePluginUrl from "../../basePluginUrl";
import getTrad from "../../utils/getTrad";

import MigrateTool from "./MigrateTool";
import { ExportCoreStoreButton } from "./ExportCoreStoreFile";

const CoreStore = () => {
  const { formatMessage } = useGlobalContext();

  const tabs = ["file", "clipboard"].map((tabName) => {
    const name = tabName;
    const camelCaseName = camelCase(tabName);

    return {
      name: formatMessage({
        id: getTrad(`CoreStore.${camelCaseName}.tab.label`),
      }),
      tabName,
      to: `${basePluginUrl}/core-store/${name}`,
    };
  });

  return (
    <>
      <Route
        path={`${basePluginUrl}/core-store`}
        render={() => <Redirect to={`${basePluginUrl}/core-store/file`} />}
        exact
      />

      <Notice>
        <div style={{ position: "relative" }}>
          <span
            style={{
              bottom: -16,
              fontSize: 41,
              marginRight: 16,
              position: "absolute",
              right: 0,
            }}
            role="img"
            aria-label="Rocket-launch"
          >
            🚀
          </span>

          <Padded size="sm">
            <h2>Back up</h2>
          </Padded>

          <Padded bottom size="smd">
            <div>
              {formatMessage({
                id: getTrad(`CoreStore.info.backupNotice`),
              })}
            </div>
          </Padded>
        </div>

        <ExportCoreStoreButton
          fileName="settings-layout-backup-strapi"
          label="Download Back-up"
        />
      </Notice>

      <Spacer />

      <HeaderNav links={tabs} style={{ marginTop: "1.6rem" }} />
      <Route
        path={`${basePluginUrl}/:migrateType/:exportType`}
        render={(props) => <MigrateTool {...props} />}
        exact
      />

      <Box my="20px">
        <SocialShare />
      </Box>
    </>
  );
};

export default CoreStore;
