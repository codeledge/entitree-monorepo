import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { prismaClient } from "../../prisma/prismaClient";

export async function getServerSideProps() {
  const chord = await prismaClient.chord.getMany({
    where: {
      artist: "Kendrick Lamar",
    },
  });
  return {
    props: { chord },
  };
}
const Artist: NextPage = ({ chord }) => {
  return (
    <div>
      <h1>Songs</h1>
      <ul>
        {chord.map((song) => (
          <li key={song.title}></li>
        ))}
      </ul>
    </div>
  );
};
export default Artist;
