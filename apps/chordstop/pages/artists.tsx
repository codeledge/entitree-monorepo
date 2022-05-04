import { Artist } from "@prisma/client";
import { Chord } from "chordsheetjs";
import Head from "next/head";
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
    <div>
      <h1>Artist</h1>
      <ul>
        {artists.map((artist) => (
          <li key={artist.label}>
            <Link href="/artist/[artist]" as={`/artist/${artist.id}`}>
              {artist.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ArtistPage;
