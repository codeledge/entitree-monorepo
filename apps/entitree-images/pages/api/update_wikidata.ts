import type { NextApiRequest, NextApiResponse } from "next";

import { getSimplifiedWikidataEntities } from "@entitree/helper";
import { prismaClient } from "../../prisma/prismaClient";

const getAllImages = async () => {
  const images = await prismaClient.image.findMany({
    where: { wikidataP31: undefined },
    take: 100,
  });
  return images;
};

const setImageById = async (id: number, data): Promise<void> => {
  const updateLog = await prismaClient.image.updateMany({
    where: { wikidataEntity: id },
    data,
  });
  // console.log(updateLog);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allImages = await getAllImages();
  let idsProcessed: string[] = [];
  for (let i in allImages) {
    let image = allImages[i];
    idsProcessed.push("Q" + image.wikidataEntity);
  }

  const wikidataEntities = await getSimplifiedWikidataEntities(idsProcessed, [
    "claims",
  ]);
  for (let i in wikidataEntities) {
    let wikidataEntity = wikidataEntities[i];
    let simpleClaims = wikidataEntities.claims;
    let numericId = Number.parseInt(wikidataEntity.id.substr(1));
    console.log(numericId, simpleClaims.P31?.[0]);
    await setImageById(numericId, {
      wikidataP31: simpleClaims.P31?.[0] ?? "undefined",
    });
  }
  console.log("Finshed processing");
  res.status(200).json({
    ids: idsProcessed,
    // results: wikidataEntities
  });
}
