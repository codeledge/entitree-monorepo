import { z } from "zod";

import { createRouter } from "./createRouter";
import { byUsername, queryUser } from "./twitter";

export const twitterRouter = createRouter()
  .query("getEnLabels", {
    meta: {
      openapi: {
        enabled: true,
        method: "GET",
        path: "/getEnLabels",
        tag: "twitter",
        summary: "Get Wikidata labels of every property",
      },
    },
    input: z.void(),
    output: z.object({
      labels: z.any(),
    }),
    resolve: () => {
      const labels = true;
      return { labels };
    },
  })
  .query("byUsername", {
    meta: {
      openapi: {
        enabled: true,
        method: "GET",
        path: "/byUsername",
        tag: "twitter",
        summary: "Get Wikidata labels of every property",
      },
    },
    input: z.object({
      username: z.string(),
    }),
    output: z.any(),
    resolve: async ({ input: { username } }) => {
      const data = await queryUser(username);
      return data;
    },
  });
