import { Box, Typography } from "@mui/material";

import { ActionStatusTypeEmoji } from "../lib/consts";
import { getEmojiByLikelihood } from "../lib/faceDetectionExpression";
/* eslint-disable @next/next/no-img-element */
import { useRecordContext } from "react-admin";

export const FaceInfoField = (props: {
  label?: string;
  title?: string;
  record?: {};
  source: string;
}) => {
  const { source, title } = props;
  const record = useRecordContext(props);
  const getEmoji = (field) => {
    return (
      <li>
        <Typography title={record[field]}>
          {ActionStatusTypeEmoji[record[field]]} {field.substr(6)}
        </Typography>
      </li>
    );
  };
  return (
    <div>
      <ul>
        {getEmoji("statusBackgroundRemoval")}
        {getEmoji("statusGoogleFaceDetection")}
        {getEmoji("statusImageCropping")}
      </ul>
      {record[source]?.[0]?.faceAnnotations?.length ? (
        <>
          <Box mb={2}>
            <Typography variant="h5">Face Detection results</Typography>
          </Box>
          <Typography>
            Faces count: {record[source][0].faceAnnotations.length}
          </Typography>
          <Typography>
            Emotion:{" "}
            {getEmojiByLikelihood(record[source][0].faceAnnotations[0])}
          </Typography>
        </>
      ) : (
        <>
          <a
            target={"_blank"}
            rel={"noreferrer"}
            href={`/api/v1/image/process/id/${record["id"]}`}
          >
            Process pictures
          </a>
          <br />
          {/* <a
            target={"_blank"}
            rel={"noreferrer"}
            href={`https://images.dataprick.com/api/v1/image/original/id/${record["id"]}/`}
          >
            See old server original
          </a>
          <br /> */}
          <img
            src={`https://images.dataprick.com/api/v1/image/original/id/${record["id"]}/`}
            width={"100px"}
            alt={""}
          ></img>
          <img
            src={`https://images.dataprick.com/api/v1/image/facecrop/id/${record["id"]}/`}
            width={"100px"}
            alt={""}
          ></img>
        </>
      )}
    </div>
  );
};
