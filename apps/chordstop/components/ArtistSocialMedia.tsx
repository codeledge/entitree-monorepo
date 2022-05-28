import { Artist } from "@prisma/client";
import { WD_INSTAGRAM_USERNAME, getComm } from "@entitree/helper";
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
            <Icon icon= />
          </a>
        </>
      )}
    </div>
  );
};

const Icon = ({ icon }: { icon: string }) => {
  return <Image src={getCoomm(icon)} width={20} height={20} />;
};
