import {
  Datagrid,
  DateField,
  EmailField,
  ImageField,
  List,
  TextField,
} from "react-admin";

import React from "react";
import { WD_COUNTRY, WD_PUBLICATION_DATE } from "@entitree/helper";

export const JoeRoganList = (props) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="id"></TextField>
      <TextField source="itemLabel"></TextField>
      {/* <TextField source={WD_COUNTRY + ".label"}></TextField> */}
      <DateField source={WD_PUBLICATION_DATE + ".label"} />
    </Datagrid>
  </List>
);
