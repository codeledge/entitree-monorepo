import {
  convertFeedToWikidata,
  convertSpotifyToFeed,
  getSpotifyShowEpisodes,
  renameClaimIdtoLabel,
  getPodcastInfo,
  POPULAR_PODCASTS,
} from "@codeledge/podcast";
import { DateTime } from "luxon";
import { z } from "zod";
import { t } from "../trpc";

const bearer = "";

export const spotifyPodcastRouter = t.router({
  getEpisodes: t.procedure
    .input(
      z.object({
        spotify_token: z.string().default(""),
        id: z.string(),
      })
    )
    .output(z.any())
    .meta({
      openapi: {
        enabled: true,
        method: "GET",
        path: "/spotify/getEpisodes",
        tags: ["spotify"],
        summary: "Get all episodes of a podcast",
      },
    })
    .query(async ({ input: { id, spotify_token } }) => {
      const output = await getSpotifyShowEpisodes(
        id,
        spotify_token,
        DateTime.now().minus({ weeks: 1 })
      );
      console.log(output);
      return output;
    }),
  getEpisodesInWikidata: t.procedure
    .input(
      z.object({
        spotify_token: z.string().default(bearer),
        id: z.string(),
      })
    )
    .output(z.any())
    .meta({
      openapi: {
        enabled: true,
        method: "GET",
        path: "/spotify/getEpisodesInWikidata",
        tags: ["spotify"],
        summary: "Get all episodes of a podcast",
      },
    })
    .query(async ({ input: { id, spotify_token } }) => {
      const wikidata = await getPodcastInfo(id);
      if (!wikidata.spotifyId) {
        throw new Error("No spotify show id found on Wikidata item");
      }
      const podcast = POPULAR_PODCASTS.find(
        (podcast) => podcast.id === wikidata.id.value
      );
      const output = await getSpotifyShowEpisodes(
        wikidata.spotifyId,
        spotify_token
        // DateTime.now().minus({ weeks: 1 })
      );
      const feed = convertSpotifyToFeed(output);
      let episodes = await renameClaimIdtoLabel(
        await convertFeedToWikidata(feed, podcast)
      );
      console.log(feed);
      // console.log(renameClaimIdtoLabel(convert));
      return {
        // output,
        episodes,
        wikidata,
        podcast,
      };
    }),
});
