import { Artist, Chord } from "../../prisma/prismaClient";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Layout from "../../components/Layout";
import Link from "next/link";
import { prismaClient } from "../../prisma/prismaClient";
import { ArtistSocialMedia } from "../../components/ArtistSocialMedia";
import Image from "next/image";
import { getCommonsUrlByFile } from "@entitree/helper";

type ArtistAndChords = Artist & { chords: Chord[] };

async function findArtist(id: number): Promise<Artist> {
  return await prismaClient.artist.findUnique({
    where: { id },
    include: {
      chords: true,
    },
  });
}

export async function getServerSideProps(context) {
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

  const artist = await findArtist(parseInt(id));
  // TODO
  if (!artist) {
    return {
      status: 404,
    };
  }
  return {
    props: { artist, status: 200 },
  };
}
const ArtistPage = ({
  status,
  artist,
}: {
  status: number;
  artist: ArtistAndChords;
}) => {
  if (status !== 200) {
    return <Layout>Not Found</Layout>;
  }
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
          <Image
            src={getCommonsUrlByFile(artist.imageCommons)}
            layout="fill"
            alt=""
          />
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
