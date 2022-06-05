import {
  Datagrid,
  DateField,
  EmailField,
  ImageField,
  List,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

import React from "react";
import { WIKIDATA_LABELS_EN } from "@entitree/helper";
import { Column } from "../lib/data/types";

export const WikidataShow = (header: Column[]) => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id"></TextField>
      <TextField source="item.label"></TextField>
      {/*<TextField source={WD_COUNTRY + ".label"}></TextField> */}
      {header &&
        header.map((col) => (
          <>
            {col.property === "P18" ? (
              <ImageField
                key={col.property}
                source={col.property + ".label"}
                label={WIKIDATA_LABELS_EN[col.property]}
              />
            ) : (
              <TextField
                key={col.property}
                source={col.property + ".label"}
                label={WIKIDATA_LABELS_EN[col.property]}
              />
            )}
          </>
        ))}
    </SimpleShowLayout>
  </Show>
);
