import { Artist } from "@prisma/client";
import { WD_INSTAGRAM_USERNAME, formatUrl } from "@entitree/helper";
import Image from "next/image";

export const ArtistSocialMedia = ({ artist }: { artist: Artist }) => {
  //artist.twitterUsername
  let twitter = artist.twitterUsername;
  let spotify = artist.spotifyArtistId;

  return (
    <div>
      {/* <a href={WD_INSTAGRAM_USERNAME} /> */}
      {/* <InstagramIcon /> */}
      {twitter && (
        <>
          <a href={twitter} target="_blank">
            <TwitterIcon />
          </a>
        </>
      )}{" "}
      {spotify && (
        <>
          <a href={spotify} target="_blank">
            <TwitterIcon />
          </a>
        </>
      )}
    </div>
  );
};

const Icon = ({ icon }: { icon: string }) => {
  return <Image src={getImage(icon)} width={20} height={20} />;
};
