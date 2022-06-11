import * as React from "react";

import { Title, useTranslate } from "react-admin";
import Card from "@mui/material/Card";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Typography } from "@mui/material";
import { HorizontalRule } from "@mui/icons-material";

const Dashboard = () => {
  const translate = useTranslate();
  return (
    <Card>
      <Title title="Start" />
      <Typography variant="h3">Wikidata tables</Typography>
      <Typography variant="h6">
        This is a demo of the Wikidata tables, a tool built in June 2022, and
        currently in development
      </Typography>
      <HorizontalRule />
      <Typography variant="h6">
        Help us on GitHub
        <a
          href="https://github.com/codeledge/entitree-monorepo/tree/main/apps/wikidata-table"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon />
        </a>
      </Typography>
    </Card>
  );
};

export default Dashboard;
