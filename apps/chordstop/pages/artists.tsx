import { Chord } from "chordsheetjs";
import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { prismaClient } from "../prisma/prismaClient";

export async function getServerSideProps() {
  const chord = await prismaClient.chord.groupBy({
    by: ["artist"],
    _sum: {
      hits: true,
    },
  });
  return {
    props: { chord },
  };
}
const Artist: NextPage | any = ({ chord }: { chord: any }) => {
  return (
    <div>
      <h1>Artist</h1>
      <ul>
        {chord.map((entry: any) => (
          <li key={entry.artist}>
            <Link href="/artist/[artist]" as={`/artist/${entry.artist}`}>
              {entry.artist}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Artist;
