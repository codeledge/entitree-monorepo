import { z } from "zod";
import {
  convertFeedToWikidata,
  convertItunesToFeed,
  getItunesShowEpisodes,
  ItunesEpisodeSchema,
  renameClaimIdtoLabel,
} from "@codeledge/podcast";
import { createRouter } from "../createRouter";
import { WIKIDATA_LABELS_EN } from "@entitree/helper";

export const applePodcastRouter = createRouter()
  .query("getItunesShowEpisodes", {
    meta: {
      openapi: {
        enabled: true,
        method: "GET",
        path: "/getItunesShowEpisodes",
        tag: "apple",
        summary: "Get all episodes of a podcast",
      },
    },
    input: z.object({
      id: z.string().regex(/^\d+$/),
    }),
    output: z.array(ItunesEpisodeSchema),
    resolve: async ({ input: { id } }) => {
      const output = await getItunesShowEpisodes(Number(id));
      console.log(output);
      return output;
    },
  })
  .query("itunesToWikidata", {
    meta: {
      openapi: {
        enabled: true,
        method: "GET",
        path: "/itunesToWikidata",
        tag: "apple",
        summary: "Get all episodes of a podcast",
      },
    },
    input: z.object({
      id: z.string().regex(/^\d+$/),
    }),
    output: z.any(),
    resolve: async ({ input: { id } }) => {
      const output = await getItunesShowEpisodes(Number(id));
      let convert = await convertFeedToWikidata(convertItunesToFeed(output));
      return renameClaimIdtoLabel(convert);
    },
  });
