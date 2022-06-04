import {
  Datagrid,
  DateField,
  EmailField,
  ImageField,
  List,
  TextField,
} from "react-admin";

import React from "react";

export const CountriesList = (props) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="id"></TextField>
      <TextField source="itemLabel"></TextField>
    </Datagrid>
  </List>
);
