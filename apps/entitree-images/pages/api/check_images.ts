import { BUCKET, ImageType, createFilePath } from "../../lib/googleStorage";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  process1_removeBackground,
  process2_detectFaces,
  process3_cropFaces,
} from "../../lib/photoEditing";

import { getSession } from "next-auth/react";
import { prismaClient } from "../../prisma/prismaClient";

const getAllImagesWithoutFile = async () => {
  const images = await prismaClient.image.findMany({
    where: {
      wikidataP31: "Q5", //only humans
      statusImageCropping: "CompletedActionStatus",
    },
  });
  return images;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const role = session?.role;
  if (role !== "admin") {
    return res.status(401).json({ message: "This is admin only" });
  }
  const allImages = await getAllImagesWithoutFile();
  let idsProcessed = [];
  let idsWithImage = [];

  const [files] = await BUCKET.getFiles({
    prefix: "uploads/transparent_face/",
  });
  files.forEach((file) => {
    console.log(file.name);
    idsWithImage.push(parseInt(file?.name?.split("/").pop().slice(0, -5))); //get Id from image -webp.
  });
  allImages.forEach((image) => {
    idsProcessed.push(image.id);
  });
  let idsWithoutImage = idsProcessed.filter((d) => !idsWithImage.includes(d));
  //reset image status if Image wasn't found
  const images = await prismaClient.image.updateMany({
    where: {
      id: { in: idsWithoutImage },
    },
    data: { statusImageCropping: "PotentialActionStatus" },
  });
  console.log("Finshed processing", idsWithoutImage.length);
  res.status(200).json({ idsProcessed, idsWithoutImage, idsWithImage });
}
