import { Chord } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { prismaClient } from "../../prisma/prismaClient";

async function findSongs(artist: string): Promise<Chord[]> {
  return await prismaClient.chord.findMany({
    where: {
      artist,
    },
  });
}

export async function getServerSideProps(context: any) {
  const { artist } = context.query;
  console.log(artist);
  const songs = await findSongs(artist);
  return {
    props: { artist, songs },
  };
}
const Artist: NextPage<any, Chord[]> = ({ artist, songs }) => {
  return (
    <div>
      <h1>{artist}: Songs</h1>
      <ul>
        {songs.map((song: Chord) => (
          <li key={song.title}>
            <Link href="/chord/[id]" as={`/chord/${song.id}`}>
              {song.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Artist;
