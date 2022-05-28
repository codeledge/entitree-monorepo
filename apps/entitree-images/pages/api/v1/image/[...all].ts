import {
  BUCKET,
  ImageType,
  createFilePath,
} from "../../../../lib/googleStorage";
import { MetricType, updateMetric } from "../../../../lib/statsUpdater";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  process1_removeBackground,
  process2_detectFaces,
  process3_cropFaces,
} from "../../../../lib/photoEditing";

import ImageModel from "../../../../models/Image";
import NextCors from "nextjs-cors";
import connectDB from "../../../../middleware/mongodb";
import { getSession } from "next-auth/react";

const getImage = async (id: number) => {
  const image = await ImageModel.findOne({
    id,
  });
  return image;
};

const imageInfo = async (id: number) => {
  console.log(id);
  await updateMetric(MetricType.apiCalled);

  const images = await ImageModel.find(
    {
      wikidataEntity: id,
      statusImageCropping: "CompletedActionStatus",
      // uploadSite: "localhost"
    } //TODO <= what?
  )
    .sort({ name: 1 })
    .limit(20);

  return images.map((image) => {
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
  await connectDB();
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const session = await getSession({ req });
  const userId = session?.userId;
  const role = session?.role;
  const [imageType, what, id] = req.query.all as string[];

  if (!isNumeric(id)) {
    res.status(403).json({ message: "Invalid id" });
    return;
  }

  if (
    imageType == "process" ||
    imageType === "reprocess" ||
    imageType === "recrop"
  ) {
    if (role !== "admin") {
      return res.status(401).json({ message: "This is admin only" });
    }

    const originalExists = await BUCKET.file(
      createFilePath(ImageType.original, +id)
    ).exists();

    if (!originalExists[0]) {
      res.status(404).json({ message: "Original doesn't exist" });
      return;
    }

    let imageData = await getImage(+id);

    if (!imageData) {
      res.status(404).json({ message: "imageData not found" });
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
