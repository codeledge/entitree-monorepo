import { BUCKET, ImageType, createFilePath } from "./googleStorage";
import { FaceAnnotations } from "../types/Image";
import { Metric, updateMetric } from "./statsUpdater";
import { cropFacesAndSave, detectFaces } from "./faceDetection";

import removePhotoBackground from "./removePhotoBackground";
import { prismaClient } from "../prisma/prismaClient";

export async function process1_removeBackground(id: number) {
  await prismaClient.image.update({
    where: { id },
    data: {
      statusBackgroundRemoval: "ActiveActionStatus",
    },
  });
  const success = await removePhotoBackground(id);
  await updateMetric(Metric.backgroundRemoval);
  return await prismaClient.image.update({
    where: { id },
    data: {
      statusBackgroundRemoval: success
        ? "CompletedActionStatus"
        : "FailedActionStatus",
    },
  });
}

export async function process2_detectFaces(id: number) {
  const googleVisionObject = await detectFaces(
    createFilePath(ImageType.without_bg, id)
  );
  const faceAnnotations = googleVisionObject[0].faceAnnotations;
  console.log(googleVisionObject);

  const faceDetectionGoogleVision: any = googleVisionObject;

  await prismaClient.image.update({
    where: { id },
    data: {
      faceDetectionGoogleVision,
      statusGoogleFaceDetection:
        !!faceAnnotations && faceAnnotations.length
          ? "CompletedActionStatus"
          : "FailedActionStatus",
    },
  });
  await updateMetric(Metric.googleCloudVisionFaceDetection);

  return googleVisionObject;
}

export async function process3_cropFaces(
  id: number,
  faceAnnotations: FaceAnnotations
) {
  console.log("Start Cropping");
  const cropStatus = await cropFacesAndSave(id, faceAnnotations);
  // const cropExists = await BUCKET.file(
  //   createFilePath(ImageType.transparent_head, id)
  // ).exists();
  // if (!cropStatus || !cropExists[0]) {
  //   console.log(
  //     "Cropping failed",
  //     "cropStatus",
  //     cropStatus,
  //     "cropExists",
  //     cropExists[0],
  //     {
  //       statusImageCropping:
  //         !!cropStatus && cropExists[0]
  //           ? "CompletedActionStatus"
  //           : "FailedActionStatus",
  //     }
  //   );
  // }
  await prismaClient.image.update({
    where: { id },
    data: {
      statusImageCropping: !!cropStatus //&& cropExists[0]
        ? "CompletedActionStatus"
        : "FailedActionStatus",
    },
  });
}
