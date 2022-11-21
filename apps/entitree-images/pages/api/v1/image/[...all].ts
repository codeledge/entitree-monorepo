import {
  BUCKET,
  ImageType,
  createFilePath,
} from "../../../../lib/googleStorage";
import { Metric, updateMetric } from "../../../../lib/statsUpdater";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  process1_removeBackground,
  process2_detectFaces,
  process3_cropFaces,
} from "../../../../lib/photoEditing";

import NextCors from "nextjs-cors";
import { getSession } from "next-auth/react";
import { Image, prismaClient } from "../../../../prisma/prismaClient";

const getImage = async (id: number) => {
  const image = await prismaClient.image.findFirst({
    where: {
      id,
    },
  });
  return image;
};

const imageInfo = async (id: number) => {
  //sync call
  updateMetric(Metric.apiCalled);

  const images = await prismaClient.image.findMany({
    where: {
      wikidataEntity: id,
      statusImageCropping: "CompletedActionStatus",
    },
    take: 20,
    orderBy: {
      priority: "asc",
    },
  });

  type ApiImage = Image & { url: { [key: string]: string } };
  return images.map((image: ApiImage) => {
    image.faceDetectionGoogleVision = undefined;
    image.url = {};
    for (let i in ImageType) {
      image.url[ImageType[i]] = createFilePath(ImageType[i], image.id, true);
    }
    return image;
  });
};

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const session = await getSession({ req });
  const userId = session?.userId;
  const role = session?.role;
  const [imageType, what, idString] = req.query.all as string[];

  const id = parseInt(idString);
  if (!isNumeric(id)) {
    res.status(403).json({ message: "Invalid id" });
    return;
  }

  if (
    imageType == "process" ||
    imageType === "reprocess" ||
    imageType === "recrop"
  ) {
    // if (role !== "admin") {
    //   console.log("admin");
    //   return res.status(401).json({ message: "This is admin only" });
    // }

    let imageData = await getImage(id);

    if (!imageData) {
      res.status(404).json({ message: "imageData not found" });
      return;
    }

    const originalExists = await BUCKET.file(
      createFilePath(ImageType.original, id)
    ).exists();

    if (!originalExists[0]) {
      //try to move file
      await BUCKET.file(
        createFilePath(ImageType.original, imageData.internalFileName)
      ).move(createFilePath(ImageType.original, imageData.id));

      res.status(404).json({ message: "Original doesn't exist" });
      return;
    }

    if (
      imageType === "reprocess" ||
      imageData.statusBackgroundRemoval !== "CompletedActionStatus"
    ) {
      //!without_bgExists
      console.log("remove BG");
      await process1_removeBackground(imageData.id);
    }
    const without_bgExists = await BUCKET.file(
      createFilePath(ImageType.without_bg, imageData.id)
    ).exists();

    if (!without_bgExists[0]) {
      res
        .status(404)
        .json({ message: "Background Removed image doesnt exist" });
      return;
    }

    if (
      imageType === "reprocess" ||
      (imageData.statusGoogleFaceDetection !== "CompletedActionStatus" &&
        imageData.statusGoogleFaceDetection !== "FailedActionStatus") //consider failed as no reason to process again
    ) {
      await process2_detectFaces(imageData.id);
      imageData = (await getImage(imageData.id)) || imageData; //otherwise it could be null
    }
    if (
      (imageType === "reprocess" ||
        imageType === "recrop" ||
        imageData.statusImageCropping !== "CompletedActionStatus") &&
      imageData.statusGoogleFaceDetection === "CompletedActionStatus"
    ) {
      console.log("process crop");
      console.log(imageData.faceDetectionGoogleVision);
      await process3_cropFaces(
        imageData.id,
        imageData.faceDetectionGoogleVision?.[0]?.faceAnnotations!
      );
      imageData = (await getImage(imageData.id)) || imageData; //otherwise it could be null
    }

    res.status(200).json({ message: "all 3 steps completed.", img: imageData });
  } else if (imageType == "info") {
    res.status(200).json({ images: await imageInfo(+id) });
  }
}
