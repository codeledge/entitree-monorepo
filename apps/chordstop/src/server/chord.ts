import { t } from "./trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prismaClient } from "../../prisma/prismaClient";
import { formatSong } from "../lib/formatSong";

export const chordRouter = t.router({
  list: t.procedure.query(async () => {
    const chords = (
      await prismaClient.chord.findMany({
        select: {
          id: true,
          title: true,
          artist: true,
        },
      })
    ).map((chord) => ({
      label: chord.artist.label + " - " + chord.title,
      id: chord.id,
    }));
    return chords;
  }),
  byId: t.procedure.input(z.number()).query(async ({ input: id }) => {
    const chord = await prismaClient.chord.findUnique({
      where: { id },
      include: {
        artist: true,
      },
    });
    if (!chord) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `No chord with id '${id}'`,
      });
    }

    let html: string;
    try {
      html = formatSong(chord.body);
    } catch (er) {
      html = "Couldn't parse this song";
      console.log(er);
    }

    // console.log(chord);

    return {
      chord,
      body: chord ? html : "",
      text: chord.body,
    };
  }),
});
