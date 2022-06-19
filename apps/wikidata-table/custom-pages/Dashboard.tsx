import * as React from "react";

import { Title, useTranslate } from "react-admin";
import Card from "@mui/material/Card";
import { Alert, Box, Divider, Typography } from "@mui/material";
import { HorizontalRule } from "@mui/icons-material";
import SimpleAccordion from "./Questions";
import grey from "@mui/material/colors/grey";
import { Projects } from "./projects";

const Dashboard = () => {
  const translate = useTranslate();
  return (
    <Card>
      <Box
        p={2}
        sx={{
          backgroundColor: grey[200],
        }}
      >
        <Title title="Start" />
        <Typography variant="h3" p={2}>
          Wikidata tables
        </Typography>
        <Alert severity="info">This tool is still in active development!</Alert>

        <Typography variant="h6" mt={2}>
          This is a demo of the Wikidata tables, a tool built in June 2022, and
          currently in development
        </Typography>
        <HorizontalRule />
        <SimpleAccordion />
        <Divider />
        <Box mt={4} />
        <Projects />
      </Box>
    </Card>
  );
};

export default Dashboard;
