import {
  Datagrid,
  DateField,
  EmailField,
  ImageField,
  Labeled,
  List,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

import React from "react";
import { WIKIDATA_LABELS_EN, WIKIDATA_TYPE } from "@entitree/helper";
import { Column } from "../lib/data/types";
import { WikidataLabelField } from "../fields/WikidataLabelField";
import { ExternalField } from "../fields/ExternalField";
import { WikidataItemField } from "../fields/WikidataItemField";

export const WikidataShow = (header: Column[]) => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <WikidataLabelField source="item.label" />
      {/*<TextField source={WD_COUNTRY + ".label"}></TextField> */}
      {header &&
        header.map((col) => (
          <>
            {/* {col.property} */}
            {col.property === "P18" && (
              <ImageField
                key={col.property}
                source={col.property + ".label"}
                label={WIKIDATA_LABELS_EN[col.property]}
              />
            )}
            {WIKIDATA_TYPE[col.property] == "WikibaseItem" && (
              <Labeled label={WIKIDATA_LABELS_EN[col.property]}>
                <WikidataItemField
                  key={col.property}
                  source={col.property}
                  // label=
                />
              </Labeled>
            )}
            {WIKIDATA_TYPE[col.property] == "String" ||
              (WIKIDATA_TYPE[col.property] == "Time" && (
                <Labeled label={WIKIDATA_LABELS_EN[col.property]}>
                  <TextField key={col.property} source={col.property} />
                </Labeled>
              ))}
          </>
        ))}
      <Labeled label="External Ids">
        <ExternalField source="item.label" />
      </Labeled>
    </SimpleShowLayout>
  </Show>
);
