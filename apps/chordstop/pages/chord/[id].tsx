import { Artist, Chord } from "@prisma/client";
import EditIcon from "@mui/icons-material/Edit";
import Layout from "../../components/Layout";
import Link from "next/link";
import type { NextPage } from "next";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { formatSong } from "../../lib/formatSong";
import { prismaClient } from "../../prisma/prismaClient";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import React, { useEffect, useState } from "react";

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
    props: {
      chord,
      body: chord ? formatSong(chord.body) : "",
      text: chord.body,
    },
  };
}

const ChordPage: NextPage<{
  chord: Chord & { artist: Artist };
  body: string;
  text: string;
}> = ({ chord, body, text }) => {
  const [downloadLink, setDownloadLink] = useState("");

  useEffect(() => {
    const data = new Blob([text], { type: "text/plain" });
    if (downloadLink !== "") window.URL.revokeObjectURL(downloadLink);
    setDownloadLink(window.URL.createObjectURL(data));
  }, []);

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
      <div>
        <Link
          href="/admin#/chord/[id]/edit"
          as={`/admin#/chord/${chord.id}/edit`}
        >
          <IconButton>
            <Tooltip title="Suggest an edit" placement="top">
              <EditIcon />
            </Tooltip>
          </IconButton>
        </Link>
        <IconButton>
          <a download="song.txt" href={downloadLink}>
            <Tooltip title="Download in Chordpro Format" placement="top">
              <FileDownloadIcon />
            </Tooltip>{" "}
          </a>
        </IconButton>
      </div>
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
