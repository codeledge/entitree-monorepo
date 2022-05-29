import type { NextApiRequest, NextApiResponse } from "next";
import {
  process1_removeBackground,
  process2_detectFaces,
  process3_cropFaces,
} from "../../lib/photoEditing";

import { getSession } from "next-auth/react";
import { prismaClient } from "../../prisma/prismaClient";

const getAllImages = async (limit, skip) => {
  const images = await prismaClient.image.findMany({
    // statusGoogleFaceDetection: "",
    // wikidataP31: "Q5", //only humans
    where: {
      statusImageCropping: "PotentialActionStatus",
    },
    skip,
    take: limit,
  });
  return images;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const userId = session?.userId;
  const role = session?.role;
  if (role !== "admin") {
    return res.status(401).json({ message: "This is admin only" });
  }
  if (!req.query.skip || !req.query.limit) {
    return res.json({ err: "Please set skip and limit" });
  }
  const skip = +req.query.skip;
  const limit = +req.query.limit;
  const allImages = await getAllImages(limit, skip);
  let idsProcessed = {};
  for (let image of allImages) {
    console.log(
      "Start processing Image ID:",
      image.id,
      "http://localhost:3010/#/images/" + image.id + "/show"
    );
    // if (
    //   image.statusBackgroundRemoval === "PotentialActionStatus"
    //   // image.statusBackgroundRemoval !== "CompletedActionStatus"
    // ) {
    //   console.log("remove BG");
    //   await process1_removeBackground(image.id);
    //   // result.push("removed_bg");
    // }
    // if (
    //   image.statusGoogleFaceDetection === "PotentialActionStatus"
    //   // image.statusGoogleFaceDetection !== "CompletedActionStatus"
    // ) {
    //   console.log("detect Faces");
    //   image.faceDetectionGoogleVision = await process2_detectFaces(image.id);
    //   // result.push("GoogleFaceDetection");
    // }

    if (
      image.statusImageCropping === "PotentialActionStatus" &&
      image.statusGoogleFaceDetection === "CompletedActionStatus" &&
      image.faceDetectionGoogleVision &&
      image.faceDetectionGoogleVision?.[0]?.faceAnnotations
      // image.statusImageCropping !== "CompletedActionStatus"
    ) {
      console.log("Cropping", image.id);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const result = await process3_cropFaces(
        image.imageId,
        image.faceDetectionGoogleVision[0].faceAnnotations
      );
      // result.push("ImageCropped");
    }

    idsProcessed[image.id] =
      "http://localhost:3010/api/v1/image/info/wikidata/" +
      image.wikidataEntity;
  }
  console.log("Finshed processing");
  res.status(200).json({ req: { skip, limit }, images: idsProcessed });
}
