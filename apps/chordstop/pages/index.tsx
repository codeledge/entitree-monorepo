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

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
interface Artist {
  item: string;
  itemLabel: string;
  linkcount: string;
  image: string;
}

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
            Display the chords you love
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
            <SearchInput />
            <hr />
            <Link href="/artists">
              <Button variant="contained">Discover</Button>
            </Link>
            {/* <Button variant="outlined">Secondary action</Button> */}
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 2 }} maxWidth="md">
        <Grid container spacing={3}>
          {artists.map((card: Artist) => (
            <Grid item key={card.item} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  // height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    // 16:9
                    pt: "56.25%",
                  }}
                  image={getCommonsUrlByFile(card.image, 200)}
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.itemLabel}
                  </Typography>
                  {/* <Typography>Descr</Typography> */}
                </CardContent>
                <CardActions>
                  <Link href={"/artist/" + card.item.split("entity/")[1]}>
                    <Button size="small">View</Button>
                  </Link>
                  {/* <Button size="small">Edit</Button> */}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
}
