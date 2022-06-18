import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { prismaClient } from "../../prisma/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const chords = await prismaClient.chord.findMany({});
  const artists = await prismaClient.artist.findMany({});
  fs.writeFileSync("./chords.json", JSON.stringify(chords));
  fs.writeFileSync("./artists.json", JSON.stringify(artists));

  res.json({ done: true });
}
