import React, { useState } from "react";
import { Button, Padded, Text } from "@buffetjs/core";
import { useGlobalContext, request } from "strapi-helper-plugin";

// import Notice from "../feedback/Notice";

import Row from "../layout/Row";

import readJsonFromFile from "../../utils/readJsonFromFile";
import getTrad from "../../utils/getTrad";
import { StyledCardWidgetFile } from "./ExportCoreStoreFile";

const ImportCoreStoreFile = () => {
  const { formatMessage } = useGlobalContext();
  const [fileForUpload, setFileForUpload] = useState(null);
  const [fileForUploadName, setFileForUploadName] = useState(null);

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    try {
      strapi.lockApp();
      await request(`/migrate/uploadCoreStoreJSON`, {
        method: "POST",
        body: {
          coreStore: fileForUpload,
        },
      });
      strapi.notification.toggle({
        message: "Settings were successfully imported.",
        timeout: 3500,
        title: "Permissions updated! 🥳",
        type: "success",
      });
      setLoadingSubmit(false);
    } catch (err) {
      strapi.notification.toggle({
        message: err.toString(),
        timeout: 3500,
        title: "Holy guacamole!",
        type: "warning",
      });
      setLoadingSubmit(false);
    }
    strapi.unlockApp();
  };

  return (
    <StyledCardWidgetFile variant="accent" icon="upload" alignSelf="flex-start">
      <Padded top size="smd">
        <h3>Upload Settings file</h3>

        {formatMessage({
          id: getTrad(`CoreStore.file.import.description`),
        })}
      </Padded>

      <Padded top size="smd">
        <label htmlFor="upload" style={{ cursor: "pointer" }}>
          <Button color="success" style={{ pointerEvents: "none" }}>
            Chose File
          </Button>
        </label>
        <input
          id="upload"
          accept=".json"
          onChange={(e) => {
            const droppedFiles = e.target.files[0];
            if (droppedFiles) {
              readJsonFromFile(droppedFiles, (value, fileName) => {
                setFileForUpload(value);
                setFileForUploadName(fileName);
              });
            } else {
              setFileForUpload(null);
            }
          }}
          style={{ display: "none" }}
          type="file"
        />
      </Padded>

      {fileForUploadName && (
        <Padded top size="smd">
          <h3>You've selected:</h3>
          <Text>{fileForUploadName}</Text>
        </Padded>
      )}

      <Row>
        <Button
          isLoading={loadingSubmit}
          disabled={!fileForUpload || loadingSubmit}
          label="Upload"
          onClick={handleSubmit}
        />
      </Row>
    </StyledCardWidgetFile>
  );
};

export default ImportCoreStoreFile;
