import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { formatSong } from "../../lib/formatSong";
import { prismaClient } from "../../prisma/prismaClient";

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const chord = await prismaClient.chord.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return {
    props: { chord, body: chord ? formatSong(chord.body) : "" },
  };
}

const Artist: NextPage<any, string> = ({ chord, body }) => {
  return (
    <div>
      <h1>Chord for {chord.title}</h1>
      {/* <pre>{disp}</pre> */}
      <div
        dangerouslySetInnerHTML={{ __html: body }}
        style={{
          fontFamily: "Arial",
        }}
      />
    </div>
  );
};
export default Artist;
