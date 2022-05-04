import { Artist, Chord } from "@prisma/client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Head from "next/head";
import Layout from "../../components/Layout";
import Link from "next/link";
import type { NextPage } from "next";
import { prismaClient } from "../../prisma/prismaClient";

async function findArtist(id: number): Promise<Artist> {
  return await prismaClient.artist.findUnique({
    where: { id },
    include: {
      chords: true,
    },
  });
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  if (id.substring(0, 1) == "Q") {
    const dbId = await prismaClient.artist.findFirst({
      where: { wikidataId: id },
    });

    if (dbId) {
      return {
        redirect: {
          permanent: false,
          destination: "/artist/" + dbId.id,
        },
      };
    }
  }
  const artist = await findArtist(parseInt(id.split("-")[0]));
  // TODO
  // if (!artist) {
  //   return {
  //     error: 404,
  //   };
  // }
  return {
    props: { artist },
  };
}
const ArtistPage = ({ artist }) => {
  return (
    <Layout>
      <h1>
        <ArrowBackIcon></ArrowBackIcon>
        {artist.label}: Songs
      </h1>
      <ul>
        {artist.chords.map((chord) => (
          <li key={chord.title}>
            <Link href="/chord/[id]" as={`/chord/${chord.id}`}>
              {chord.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
export default ArtistPage;
