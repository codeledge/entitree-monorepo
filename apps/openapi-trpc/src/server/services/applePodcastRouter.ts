import { z } from "zod";
import {
  convertFeedToWikidata,
  convertItunesToFeed,
  getItunesShowEpisodes,
  ItunesEpisodeSchema,
  renameClaimIdtoLabel,
} from "@codeledge/podcast";
import { WIKIDATA_LABELS_EN } from "@entitree/helper";
import { t } from "../trpc";

export const applePodcastRouter = t.router({
  getItunesShowEpisodes: t.procedure
    .input(
      z.object({
        id: z.string().regex(/^\d+$/),
      })
    )
    .output(z.array(ItunesEpisodeSchema))
    .meta({
      openapi: {
        enabled: true,
        method: "GET",
        path: "/getItunesShowEpisodes",
        tags: ["apple"],
        summary: "Get all episodes of a podcast",
      },
    })
    .query(async ({ input: { id } }) => {
      const output = await getItunesShowEpisodes(Number(id));
      console.log(output);
      return output;
    }),
  itunesToWikidata: t.procedure
    .input(
      z.object({
        id: z.string().regex(/^\d+$/),
      })
    )
    .output(z.any())
    .meta({
      openapi: {
        enabled: true,
        method: "GET",
        path: "/itunesToWikidata",
        tags: ["apple"],
        summary: "Get all episodes of a podcast",
      },
    })
    .query(async ({ input: { id } }) => {
      const output = await getItunesShowEpisodes(Number(id));
      let convert = await convertFeedToWikidata(convertItunesToFeed(output));
      return renameClaimIdtoLabel(convert);
    }),
});
