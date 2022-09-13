import type { NextApiRequest, NextApiResponse } from "next";
import { ActionStatus, prismaClient } from "../../prisma/prismaClient";
import images from "../../images.json";
// import { iamges } from "../../images";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(images[0]);
  await prismaClient.image.createMany({
    data: images.map(({ imageId, id, createdById, ...image }) => ({
      ...image,
      id: imageId,
      statusBackgroundRemoval: ActionStatus[image.statusBackgroundRemoval],
      statusGoogleFaceDetection: ActionStatus[image.statusGoogleFaceDetection],
      statusImageCropping: ActionStatus[image.statusImageCropping],
      faceDetectionGoogleVision: image.faceDetectionGoogleVision || undefined,
    })),
  });
  //

  res.json({ done: true });
}
