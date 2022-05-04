import type { NextApiRequest, NextApiResponse } from "next";
import {
  WD_APPLE_MUSIC_ARTIST_ID_US_VERSION,
  WD_SPOTIFY_ARTIST_ID,
  WD_TWITTER_USERNAME,
  WD_ULTIMATE_GUITAR_ARTIST_ID,
  getSimplifiedWikidataEntities,
  getWikidataEntities,
  wikidataSearchEntities,
} from "@entitree/helper";

import { prismaClient } from "../../prisma/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // await getWikidataIds();
  await fillWikidata();
  res.status(200).json({ message: "Done;" });
}
async function fillWikidata() {
  const artists = await prismaClient.artist.findMany({
    where: {
      spotifyArtistId: null,
    },
  });
  artists.map(async (artist) => {
    const search = await getSimplifiedWikidataEntities([artist.wikidataId]);
    if (search[artist.wikidataId]) {
      let claims = search[artist.wikidataId].claims;
      const spotifyArtistId = claims[WD_SPOTIFY_ARTIST_ID]?.[0].value;
      const appleArtistID =
        claims[WD_APPLE_MUSIC_ARTIST_ID_US_VERSION]?.[0].value;
      const twitterUsername = claims[WD_TWITTER_USERNAME]?.[0].value;
      const ultimateGuitarId = claims[WD_ULTIMATE_GUITAR_ARTIST_ID]?.[0].value;
      const wikipediaSlugEn =
        search[artist.wikidataId].sitelinks?.enwiki?.title;
      console.log(wikipediaSlugEn);
      await prismaClient.artist.update({
        where: {
          id: artist.id,
        },
        data: {
          spotifyArtistId,
          appleArtistID,
          twitterUsername,
          ultimateGuitarId,
          wikipediaSlugEn,
        },
      });
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });
}
async function getWikidataIds() {
  const artists = await prismaClient.artist.findMany({
    where: {
      wikidataId: null,
    },
  });
  artists.map(async (artist) => {
    const search = await wikidataSearchEntities(artist.label, "en");
    if (search.length > 0) {
      console.log(search[0]);
      await prismaClient.artist.update({
        where: {
          id: artist.id,
        },
        data: {
          wikidataId: search[0].id,
        },
      });
    } else {
      console.log("coudn't find", artist.label);
    }
  });
}
