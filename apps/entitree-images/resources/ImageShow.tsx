import * as React from "react";

import {
  DeleteButton,
  EditButton,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
} from "react-admin";

import { FaceInfoField } from "../fields/FaceInfoField";
import { ImageAllField } from "../fields/ImageAllField";
import { WikidataLinkField } from "../fields/WikidataLinkField";

const ImageShowActions = ({
  /*permissions,*/ basePath,
  data,
  //record, //docs say it's record, but it's "data"
  resource,
}) => {
  return (
    <TopToolbar>
      <EditButton record={data} />
      {/* {permissions === "admin" && ( */}
      <DeleteButton record={data} resource={resource} />
      {/* )} */}
    </TopToolbar>
  );
};

export const ImageShow = (props) => (
  // ImageShowActions permissions={permissions}
  <Show title="Image view" actions={<ImageShowActions {...props} />} {...props}>
    <SimpleShowLayout>
      <TextField source="imageId" />
      {/* <NumberField source="fileSize" /> */}
      {/* <TextField source="wikidataLabel" /> */}
      <TextField source="wikidataEntity" />
      <TextField source="sourceUrl" />
      <TextField source="comment" />
      <WikidataLinkField source="wikidataEntity" />
      <FaceInfoField source="faceDetectionGoogleVision" />
      <ImageAllField source="imageId" title="image" label="image" />
    </SimpleShowLayout>
  </Show>
);
