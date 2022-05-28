import ImageModel, { Image } from "../../models/Image";
import type { NextApiRequest, NextApiResponse } from "next";

import { getSimplifiedWikidataEntities } from "@entitree/helper";

const getAllImages = async () => {
  const images = await ImageModel.find({ wikidataP31: undefined })
    .limit(100)
    .skip(0);
  return images;
};

const setImageById = async (id: number, data: Partial<Image>) => {
  const updateLog = await ImageModel.updateMany(
    { wikidataEntity: id },
    { $set: data },
    { multi: true }
  );
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

  const wikidataEntities = await getSimplifiedWikidataEntities(
     idsProcessed,
    ["claims"],
  );
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
