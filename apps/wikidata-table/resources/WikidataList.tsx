import {
  List,
  Pagination,
  ShowButton,
  TextField,
  TextInput,
  CreateButton,
  ExportButton,
  FilterButton,
  TopToolbar,
  SelectColumnsButton,
  DatagridConfigurable,
} from "react-admin";
import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { WIKIDATA_LABELS_EN } from "@entitree/helper";
import { Column, Page } from "../lib/data/types";
import { CountryInput } from "../fields/CountryInput";
import { WikidataLabelField } from "../fields/WikidataLabelField";
import { useListView } from "../views/ListViewButton";
import { DesktopGrid } from "../views/DesktopGrid";

export const WikidataList = (page: Page) => {
  const theme = useTheme();
  const isXsmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  const [view] = useListView(page.id);

  const header = page.header;
  let filters = [
    <TextInput
      key="item"
      label="Search"
      source="item"
      resettable
      alwaysOn
    />,
    <CountryInput
      key="Country"
      source="P17"
    />,
  ];
  if (page.filterButtons) {
    filters = filters.concat(page.filterButtons);
  }
  return (
    <List
      disableAuthentication
      filters={filters}
      pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100]} />}
      actions={
        <TopToolbar>
          {isSmall ? <FilterButton /> : null}
          <ExportButton />
          <SelectColumnsButton />
          {/* <ListViewButton table={page.id} /> */}
        </TopToolbar>
      }
    >
      <WikidataDatagrid header={header} />
      {/* {isXsmall ? (
        // <MobileGrid />
        <span>Not available yet on mobile</span>
      ) : view === "grid" ? (
        <DesktopGrid header={header} />
      ) : (
        <WikidataDatagrid header={header} />
      )} */}
    </List>
  );
};

const WikidataDatagrid = ({ header }: { header: Column[] }) => (
  <DatagridConfigurable
    // optimized //NOT SUPPORTED ANYMORE
    bulkActionButtons={false}
  >
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
  </DatagridConfigurable>
);
