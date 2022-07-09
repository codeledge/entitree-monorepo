import * as React from "react";
import { Button, useStore } from "react-admin";
import { ButtonGroup } from "@mui/material";
import TableChartIcon from "@mui/icons-material/TableChart";
import AppsIcon from "@mui/icons-material/Apps";

export const useListView = (table) =>
  useStore<"table" | "grid">(table + ".view", "table");

export const ListViewButton = ({ table }) => {
  const [view, setView] = useListView(table);

  return (
    <ButtonGroup key="view-selector-tool-menu">
      <Button
        color={view === "table" ? "primary" : "inherit"}
        onClick={(): void => setView("table")}
        label="table"
      >
        <TableChartIcon />
      </Button>
      <Button
        color={view === "grid" ? "primary" : "inherit"}
        onClick={(): void => setView("grid")}
        label="grid"
      >
        <AppsIcon />
      </Button>
    </ButtonGroup>
  );
};
