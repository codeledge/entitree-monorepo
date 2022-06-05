import { Artist, Chord } from ".prisma_chordstop/client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Head from "next/head";
import Layout from "../../components/Layout";
import Link from "next/link";
import type { NextPage } from "next";
import { prismaClient } from "../../prisma/prismaClient";
import { ArtistSocialMedia } from "../../components/ArtistSocialMedia";
import Image from "next/image";
import { getCommonsUrlByFile } from "@entitree/helper";

type ArtistAndChords = Artist & { chords: Chord[] };

async function findArtist(id: number): Promise<ArtistAndChords> {
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
const ArtistPage = ({ artist }: { artist: ArtistAndChords }) => {
  return (
    <Layout>
      {artist.imageCommons && (
        <div
          style={{
            position: "absolute",
            right: "10px",
            height: "150px",
            width: "100px",
          }}
        >
          <Image src={getCommonsUrlByFile(artist.imageCommons)} layout="fill" />
        </div>
      )}
      <h1>
        <ArrowBackIcon></ArrowBackIcon>
        {artist.label}: Songs
      </h1>
      <div>
        <ArtistSocialMedia artist={artist} />
      </div>

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
