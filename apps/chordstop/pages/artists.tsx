import { List, ListItem, Typography } from "@mui/material";
import { Artist } from "../prisma/prismaClient";
import Layout from "../components/Layout";
import Link from "next/link";
import { prismaClient } from "../prisma/prismaClient";

export async function getServerSideProps() {
  const artists = await prismaClient.artist.findMany();
  console.log(artists);
  return {
    props: { artists },
  };
}
const ArtistPage = ({ artists }: { artists: Artist[] }) => {
  return (
    <Layout>
      <Typography variant="h2" component="h2">
        Artist
      </Typography>
      <List>
        {artists.map((artist) => (
          <ListItem key={artist.label}>
            <Link href="/artist/[artist]" as={`/artist/${artist.id}`}>
              {artist.label}
            </Link>
          </ListItem>
        ))}
      </List>
    </Layout>
  );
};
export default ArtistPage;
