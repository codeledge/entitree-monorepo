import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { prismaClient } from "../../prisma/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const images = await prismaClient.image.findMany({});
  fs.writeFileSync("./images.json", JSON.stringify(images));

  res.json({ done: true });
}
