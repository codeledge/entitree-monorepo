import * as React from "react";

import { DateInput, Edit, SimpleForm, TextField, TextInput } from "react-admin";

export const ImageEdit = (props) => (
  <Edit title="Edit Image" {...props}>
    <SimpleForm>
      <TextField source="id" />
      <TextInput source="wikidataLabel" fullWidth />
      <TextInput source="wikidataEntity" fullWidth />
      <TextInput source="sourceUrl" fullWidth />
      <TextInput source="comment" multiline minRows={3} />
      <DateInput source="recordedDate" />
    </SimpleForm>
  </Edit>
);
