import {
  AutocompleteInput,
  Datagrid,
  DateField,
  EmailField,
  ImageField,
  List,
  SearchInput,
  ShowButton,
  TextField,
  TextInput,
} from "react-admin";

import React from "react";
import { WD_COUNTRY, WIKIDATA_LABELS_EN } from "@entitree/helper";
import { Column } from "../lib/data/types";
import { CountryInput } from "../fields/CountryInput";
import { WikidataLabelField } from "../fields/WikidataLabelField";

//rowClick="show"
export const WikidataList = (header: Column[]) => (
  <List
    filters={[
      <TextInput key="item" label="Search" source="item" resettable alwaysOn />,
      <CountryInput key="Country" source="P17" />,
      // <AutocompleteInput key="P17" source="P17" label="country" alwaysOn />,
    ]}
  >
    <Datagrid>
      <TextField source="id"></TextField>
      <WikidataLabelField source="item.label" />
      {/*<TextField source={WD_COUNTRY + ".label"}></TextField> */}
      {header &&
        header.map(
          (col) =>
            col.property !== "P18" && (
              <TextField
                key={col.property}
                source={col.property + ".label"}
                label={WIKIDATA_LABELS_EN[col.property]}
                sortable={col.propertyType !== "WikibaseItem"}
              />
            )
        )}
      <ShowButton />
    </Datagrid>
  </List>
);
