import {
  AutocompleteInput,
  Datagrid,
  DateField,
  EmailField,
  ImageField,
  List,
  Pagination,
  SearchInput,
  ShowButton,
  TextField,
  TextInput,
} from "react-admin";

import React from "react";
import {
  WD_COUNTRY,
  WD_PART_OF_THE_SERIES,
  WIKIDATA_LABELS_EN,
} from "@entitree/helper";
import { Column, Page } from "../lib/data/types";
import { CountryInput } from "../fields/CountryInput";
import { WikidataLabelField } from "../fields/WikidataLabelField";
import { DESCRIPTIONS } from "../lib/data/podcastDescriptions";

//rowClick="show"
export const WikidataList = (page: Page) => {
  const header = page.header;
  let filters = [
    <TextInput key="item" label="Search" source="item" resettable alwaysOn />,
    <CountryInput key="Country" source="P17" />,
  ];
  if (page.id === "podcast_episodes") {
    filters.push(
      <AutocompleteInput
        key={WD_PART_OF_THE_SERIES}
        source={WD_PART_OF_THE_SERIES}
        label="part of"
        choices={DESCRIPTIONS.map((d) => ({
          id: d.id,
          name: d.title,
        }))}
        alwaysOn
      />
    );
  }
  return (
    <List
      filters={filters}
      pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100]} />}
    >
      <Datagrid>
        <TextField source="id"></TextField>
        <WikidataLabelField source="item.label" />
        {/*<TextField source={WD_COUNTRY + ".label"}></TextField> */}
        {header &&
          header.map(
            (col) =>
              col.property !== "P18" &&
              col.list !== false &&
              col.visible !== false && (
                <TextField
                  key={col.property}
                  source={
                    col.property +
                    (col.propertyType === "WikibaseItem" ? ".label" : "")
                  }
                  label={WIKIDATA_LABELS_EN[col.property]}
                  sortable={col.propertyType !== "WikibaseItem"}
                />
              )
          )}
        <ShowButton />
      </Datagrid>
    </List>
  );
};
