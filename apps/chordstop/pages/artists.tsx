import { List, ListItem, Typography } from "@mui/material";

import { Artist } from ".prisma/client";
import { Chord } from "chordsheetjs";
import Head from "next/head";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Link from "next/link";
import type { NextPage } from "next";
import { prismaClient } from "../prisma/prismaClient";

export async function getServerSideProps() {
  // const chord = await prismaClient.chord.groupBy({
  //   by: ["artistLabel"],
  //   _sum: {
  //     hits: true,
  //   },
  // });
  const artists = await prismaClient.artist.findMany();
  return {
    props: { artists },
  };
}
const ArtistPage = ({ artists }: { artists: Artist[] }) => {
  return (
    <Layout>
      <Typography variant="h2" component="h2">
        Artist
      </Typography>
      <List>
        {artists.map((artist) => (
          <ListItem key={artist.label}>
            <Link href="/artist/[artist]" as={`/artist/${artist.id}`}>
              {artist.label}
            </Link>
          </ListItem>
        ))}
      </List>
    </Layout>
  );
};
export default ArtistPage;
