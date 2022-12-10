import { z } from "zod";
import { directionGMaps, searchPlace } from "@codeledge/google-maps";
import { t } from "../trpc";

export const googleMapsRouter = t.router({
  // directions: t.procedure
  //   .input(
  //     z.object({
  //       key: z.string(),
  //     })
  //   )
  //   .output(z.any())
  //   .query(async ({ input }) => {
  //     const output = await directionGMaps(process.env.GOOGLE_API_KEY);
  //     const time = output.routes[0].legs[0].duration.value / 60;
  //     return { time, output };
  //   }),
  // place: t.procedure
  //   .input(
  //     z.object({
  //       key: z.string(),
  //     })
  //   )
  //   .output(z.any())
  //   .meta({
  //     openapi: {
  //       enabled: true,
  //       method: "GET",
  //       path: "/place",
  //       tags: ["maps"],
  //       summary: "Get data from NIK",
  //     },
  //   })
  //   .query(({ input }) => {
  //     const output = searchPlace(
  //       process.env.GOOGLE_API_KEY,
  //       "Ngurah Rai Airport"
  //     );
  //     return output;
  //   }),
});
