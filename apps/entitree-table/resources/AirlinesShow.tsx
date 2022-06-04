import { Show, SimpleShowLayout, TextField } from "react-admin";

import React from "react";

export const AirlinesShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id"></TextField>
      <TextField source="itemLabel"></TextField>
    </SimpleShowLayout>
  </Show>
);
