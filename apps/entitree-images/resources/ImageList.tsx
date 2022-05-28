import {
  Datagrid,
  DateField,
  List,
  ReferenceField,
  TextField,
  TextInput,
  usePermissions,
} from "react-admin";

import { ActionTypeField } from "../fields/ActionTypeField";
import { AdminActionField } from "../fields/AdminActionField";
import { ImageDbField } from "../fields/ImageDbField";
import React from "react";

const imageFilters = [
  <TextInput
    key="labelsearch"
    label="Search by Label"
    source="wikidataLabel"
    alwaysOn
  />,
  <TextInput key="usersearch" label="Search by User" source="createdBy" />,
];

export const ImageList = (props) => {
  const { permissions } = usePermissions();
  return (
    <List {...props} filters={imageFilters}>
      <Datagrid rowClick="show">
        <ImageDbField source="id" title="wikidataLabel" label="image" />
        <TextField source="wikidataLabel" />
        <TextField source="wikidataEntity" label="Wikidata id" />
        {/* <TextField source="viewCount" /> */}
        <TextField source="wikidataP31" />
        <ActionTypeField source="statusGoogleFaceDetection" label="face" />
        <ActionTypeField source="statusBackgroundRemoval" label="bg" />
        <ActionTypeField source="statusImageCropping" label="crop" />
        {/* {permissions === "admin" && (
          <ReferenceField label="User" source="createdBy" reference="users">
            <TextField source="email" />
          </ReferenceField>
        )}
        {permissions === "admin" && (
          <AdminActionField label="Action" source="id" />
        )} */}
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <TextField source="id" />
      </Datagrid>
    </List>
  );
};
