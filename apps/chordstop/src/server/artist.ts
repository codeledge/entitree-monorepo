import { t } from "./trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prismaClient } from "../../prisma/prismaClient";

export const artistRouter = t.router({
  list: t.procedure.query(async () => {
    const artists = await prismaClient.artist.findMany();
    return artists;
  }),
  byId: t.procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const artist = await prismaClient.artist.findUnique({
        where: { id },
        include: {
          chords: true,
        },
      });
      if (!artist) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No artist with id '${id}'`,
        });
      }
      return artist;
    }),
});
