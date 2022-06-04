import {
  Datagrid,
  DateField,
  EmailField,
  ImageField,
  List,
  TextField,
} from "react-admin";

import React from "react";
import { WD_COUNTRY } from "@entitree/helper";

export const UniversitiesList = (props) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="id"></TextField>
      <TextField source="itemLabel"></TextField>
      <TextField source={WD_COUNTRY + ".label"}></TextField>
    </Datagrid>
  </List>
);
