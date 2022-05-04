import type { NextApiRequest, NextApiResponse } from "next";

import { prismaClient } from "../../prisma/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const artists = await prismaClient.chord.groupBy({
    by: ["artistLabel"],
    _sum: {
      hits: true,
    },
  });
  // artists.map(async (artist) => {
  //   console.log(artist.artistLabel);
  //   if (
  //     !(await prismaClient.artist.findFirst({
  //       where: { label: artist.artistLabel },
  //     }))
  //   ) {
  //     const songs = await prismaClient.chord.findMany({
  //       where: {
  //         artistLabel: artist.artistLabel,
  //       },
  //     });
  //     const songIds = songs.map((chord) => {
  //       return { id: chord.id };
  //     });
  //     await prismaClient.artist.create({
  //       data: {
  //         label: artist.artistLabel,
  //         chords: {
  //           connect: songIds,
  //         },
  //       },
  //     });
  //   }
  // });

  res.status(200).json({ artists, message: "Done;" });
}
