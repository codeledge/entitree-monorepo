import { Chord } from "@prisma/client";
import Head from "next/head";
import Layout from "../../components/Layout";
import Link from "next/link";
import type { NextPage } from "next";
import { Typography } from "@mui/material";
import { formatSong } from "../../lib/formatSong";
import { prismaClient } from "../../prisma/prismaClient";

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const chord = await prismaClient.chord.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      artist: true,
    },
  });
  return {
    props: { chord, body: chord ? formatSong(chord.body) : "" },
  };
}

const ChordPage: NextPage<{ chord: Chord; body: string }> = ({
  chord,
  body,
}) => {
  return (
    <Layout>
      <Typography variant="h4">
        <Link href="/artist/[id]" as={`/artist/${chord.artist.id}`}>
          {chord.artist.label}
        </Link>
      </Typography>
      <Typography variant="h2" component="h2">
        Chord for {chord.title}
      </Typography>
      {/* <pre>{disp}</pre> */}
      <div
        dangerouslySetInnerHTML={{ __html: body }}
        style={{
          fontFamily: "Arial",
        }}
      />
    </Layout>
  );
};
export default ChordPage;
