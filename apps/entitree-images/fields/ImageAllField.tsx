/* eslint-disable @next/next/no-img-element */
import { Box, IconButton, Typography } from "@mui/material";
import { GC_BUCKET } from "../config/const";
import React from "react";
import { useRecordContext } from "react-admin";
import { DownloadForOffline } from "@mui/icons-material";

export const ImageAllField = (props: {
  label: string;
  title: string;
  record?: {};
  source: string;
}) => {
  const { source, title } = props;
  const record = useRecordContext(props);
  const storage_url =
    "https://storage.googleapis.com/" + GC_BUCKET + "/uploads/";
  const url = "face/" + record[source] + ".webp?" + Math.random();
  const url2 =
    storage_url +
    "transparent_face/" +
    record[source] +
    ".webp?" +
    Math.random();
  const url3 =
    storage_url +
    "transparent_head/" +
    record[source] +
    ".webp?" +
    Math.random();

  const pngUrl =
    "/api/v1/image/png/" +
    record[source] +
    "/" +
    record["wikidataLabel"] +
    ".png";
  return (
    <div>
      <img
        alt=""
        src={`${storage_url}original/${record[source]}`}
        title={title}
        width={60}
      />
      <Box my={2}>
        <Typography variant="h5">
          Without Bg Image
          <a
            href={pngUrl}
            rel="noopener noreferrer"
            // download
          >
            <IconButton onClick={() => window.open(pngUrl)}>
              <DownloadForOffline />
            </IconButton>
          </a>
        </Typography>
      </Box>

      <img
        alt=""
        src={`${storage_url}without_bg/${record[source]}`}
        title={title}
        width={60}
      />
      <Box my={2}>
        <Typography variant="h5">Face Images</Typography>
      </Box>
      <img
        alt=""
        src={url}
        title={title}
        width={200}
      />
      <img
        alt=""
        src={url2}
        title={"transparent"}
        width={200}
        style={{ backgroundColor: "grey" }}
      />
      <img
        alt=""
        src={url3}
        title={"transparent"}
        width={200}
        style={{ backgroundColor: "grey" }}
      />
    </div>
  );
};
