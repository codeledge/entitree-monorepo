import {
  AutocompleteInput,
  Datagrid,
  DateField,
  EmailField,
  ImageField,
  List,
  SearchInput,
  TextField,
  TextInput,
} from "react-admin";

import React from "react";
import { WD_COUNTRY, WIKIDATA_LABELS_EN } from "@entitree/helper";
import { Column } from "../lib/data/types";

export const WikidataList = (header: Column[]) => (
  <List
    filters={[
      <AutocompleteInput key="P17" source="P17" label="country" alwaysOn />,
    ]}
  >
    <Datagrid rowClick="show">
      <TextField source="id"></TextField>
      <TextField source="item.label"></TextField>
      {/*<TextField source={WD_COUNTRY + ".label"}></TextField> */}
      {header &&
        header.map((col) => (
          <TextField
            key={col.property}
            source={col.property + ".label"}
            label={WIKIDATA_LABELS_EN[col.property]}
          />
        ))}
    </Datagrid>
  </List>
);
