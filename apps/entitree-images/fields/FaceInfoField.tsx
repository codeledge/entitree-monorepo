import { Box, Typography } from "@mui/material";

import { ActionStatusTypeEmoji } from "../lib/consts";
import { getEmojiByLikelihood } from "../lib/faceDetectionExpression";
import { useRecordContext } from "react-admin";
import { Image } from "../prisma/prismaClient";

export const FaceInfoField = (props: {
  label?: string;
  title?: string;
  record?: {};
  source: "faceDetectionGoogleVision";
}) => {
  const { source, title } = props;
  const record = useRecordContext(props) as Image;
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
            {getEmojiByLikelihood(
              record[source][0].faceAnnotations[0] as string
            )}
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
        </>
      )}
    </div>
  );
};
