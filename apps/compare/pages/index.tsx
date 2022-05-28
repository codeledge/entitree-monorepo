import * as React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Link from "@mui/material/Link";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SearchInput from "../components/Search";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import artists from "../lib/wikidata/artists_selected.json";
import { getCommonsUrlByFile } from "@entitree/helper";

const theme = createTheme();

export default function Album() {
  return (
    <Layout>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Display the tables you love
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Without ads.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            {/* <SearchInput />
            <hr />
            <Link href="/artists">
              <Button variant="contained">Discover</Button>
            </Link> */}
            {/* <Button variant="outlined">Secondary action</Button> */}
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
}
