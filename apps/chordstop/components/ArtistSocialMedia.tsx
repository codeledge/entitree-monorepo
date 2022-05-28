import InstagramIcon from "@mui/icons-material/Instagram";
import { Artist } from "@prisma/client";
import TwitterIcon from "@mui/icons-material/Twitter";
import { WD_INSTAGRAM_USERNAME } from "@entitree/helper";

export const ArtistSocialMedia = ({ artist }: { artist: Artist }) => {
  //artist.twitterUsername
  return (
    <div>
      <a href={WD_INSTAGRAM_USERNAME} />
      {/* <InstagramIcon /> */}

      <TwitterIcon />
    </div>
  );
};
