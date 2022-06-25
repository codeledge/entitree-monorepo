import {
  Datagrid,
  DateField,
  Edit,
  EmailField,
  ImageField,
  Labeled,
  List,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from "react-admin";

import React from "react";
import { WIKIDATA_LABELS_EN, WIKIDATA_TYPE } from "@entitree/helper";
import { Column } from "../lib/data/types";
import { WikidataLabelField } from "../fields/WikidataLabelField";
import { ExternalField } from "../fields/ExternalField";
import { WikidataItemField } from "../fields/WikidataItemField";

export const WikidataEdit = (header: Column[]) => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" contentEditable={"false"} />
      <TextInput source="item.label" />
      {header &&
        header.map((col) => (
          <>
            {WIKIDATA_TYPE[col.property] == "WikibaseItem" && (
              <Labeled label={WIKIDATA_LABELS_EN[col.property]}>
                <TextInput
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
    </SimpleForm>
  </Edit>
);
