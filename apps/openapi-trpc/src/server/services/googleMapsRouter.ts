import { z } from "zod";
import { directionGMaps, searchPlace } from "@codeledge/google-maps";
import { createRouter } from "../createRouter";

export const googleMapsRouter = createRouter()
  .query("directions", {
    input: z.object({
      key: z.string(),
    }),
    output: z.any(),
    resolve: async ({ input }) => {
      const output = await directionGMaps(process.env.GOOGLE_API_KEY);
      const time = output.routes[0].legs[0].duration.value / 60;
      return { time, output };
    },
  })
  .query("place", {
    meta: {
      openapi: {
        enabled: true,
        method: "GET",
        path: "/place",
        tags: ["maps"],
        summary: "Get data from NIK",
      },
    },
    input: z.object({
      key: z.string(),
    }),
    output: z.any(),
    resolve: ({ input }) => {
      const output = searchPlace(
        process.env.GOOGLE_API_KEY,
        "Ngurah Rai Airport"
      );
      return output;
    },
  });
