import EditIcon from "@mui/icons-material/Edit";
import Layout from "../../components/Layout";
import Link from "next/link";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import React, { useEffect, useState } from "react";
import { Link as MUILink } from "@mui/material";
import { trpc } from "../../src/utils/trpc";
import { useRouter } from "next/router";

const ChordPage = () => {
  const id = parseInt(useRouter().query.id as string);
  const chordQuery = trpc.proxy.chord.byId.useQuery(id);
  const [downloadLink, setDownloadLink] = useState("");

  // useEffect(() => {
  //   if (chordQuery.data?.text) {
  //     const data = new Blob([chordQuery.data.text], { type: "text/plain" });
  //     if (downloadLink !== "") window.URL.revokeObjectURL(downloadLink);
  //     setDownloadLink(window.URL.createObjectURL(data));
  //   }
  // }, [downloadLink, chordQuery]);

  const chord = chordQuery.data?.chord;
  const body = chordQuery.data?.body;

  return (
    <Layout>
      <Typography variant="h4">
        {chord && (
          <Link href="/artist/[id]" as={`/artist/${chord.artist.id}`}>
            <MUILink underline="none">{chord.artist.label}</MUILink>
          </Link>
        )}
      </Typography>
      <Typography variant="h2" component="h2">
        {chord && chord.title}
      </Typography>
      <Box>
        <Link href="/admin#/chord/[id]/edit" as={`/admin#/chord/${id}/edit`}>
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
            </Tooltip>
          </a>
        </IconButton>
      </Box>
      {body && (
        <Box
          dangerouslySetInnerHTML={{ __html: body }}
          style={{
            fontFamily: "Arial",
          }}
        />
      )}
    </Layout>
  );
};
export default ChordPage;
