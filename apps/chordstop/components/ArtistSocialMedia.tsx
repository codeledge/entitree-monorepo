import { Artist } from "@prisma/client";
import {
  WIKIDATA_ICON,
  WD_TWITTER_USERNAME,
  formatUrl,
  FormatUrlProps,
  WD_APPLE_MUSIC_ARTIST_ID_US_VERSION,
  WD_ULTIMATE_GUITAR_ARTIST_ID,
  WD_SPOTIFY_ARTIST_ID,
} from "@entitree/helper";
import Image from "next/image";

export const ArtistSocialMedia = ({ artist }: { artist: Artist }) => {
  return (
    <div>
      {artist.twitterUsername && (
        <Link property={WD_TWITTER_USERNAME} value={artist.twitterUsername} />
      )}
      {artist.appleArtistID && (
        <Link
          property={WD_APPLE_MUSIC_ARTIST_ID_US_VERSION}
          value={artist.appleArtistID}
        />
      )}

      {artist.spotifyArtistId && (
        <Link property={WD_SPOTIFY_ARTIST_ID} value={artist.spotifyArtistId} />
      )}
      {/* {artist.ultimateGuitarId && (
        <Link
          property={WD_ULTIMATE_GUITAR_ARTIST_ID}
          value={artist.ultimateGuitarId}
        />
      )} */}
    </div>
  );
};

const Link = ({
  property,
  value,
}: {
  property: FormatUrlProps;
  value: string;
}) => {
  return (
    <a
      href={formatUrl(property, value)}
      target="_blank"
      style={{ marginRight: "1em" }}
    >
      {WIKIDATA_ICON[property] ? (
        <Image src={WIKIDATA_ICON[property]} width={20} height={20} alt="" />
      ) : (
        <>??</>
      )}
    </a>
  );
};
