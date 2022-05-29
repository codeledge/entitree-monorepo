import { BUCKET, ImageType, createFilePath } from "./googleStorage";
import { FaceAnnotations } from "../types/Image";
import { MetricType, updateMetric } from "./statsUpdater";
import { cropFacesAndSave, detectFaces } from "./faceDetection";

import removePhotoBackground from "./removePhotoBackground";
import { prismaClient } from "../prisma/prismaClient";

export async function process1_removeBackground(imageId: number) {
  await prismaClient.image.update({
    where: { imageId },
    data: {
      statusBackgroundRemoval: "ActiveActionStatus",
    },
  });
  const success = await removePhotoBackground(imageId);
  await updateMetric(MetricType.backgroundRemoval);
  return await prismaClient.image.update({
    where: { imageId },
    data: {
      statusBackgroundRemoval: success
        ? "CompletedActionStatus"
        : "FailedActionStatus",
    },
  });
}

export async function process2_detectFaces(imageId: number) {
  const googleVisionObject = await detectFaces(
    createFilePath(ImageType.without_bg, imageId)
  );
  const faceAnnotations = googleVisionObject[0].faceAnnotations;
  console.log(googleVisionObject);

  const faceDetectionGoogleVision: any = googleVisionObject;

  await prismaClient.image.update({
    where: { imageId },
    data: {
      faceDetectionGoogleVision,
      statusGoogleFaceDetection:
        !!faceAnnotations && faceAnnotations.length
          ? "CompletedActionStatus"
          : "FailedActionStatus",
    },
  });
  await updateMetric(MetricType.googleCloudVisionFaceDetection);
  return googleVisionObject;
}

export async function process3_cropFaces(
  imageId: number,
  faceAnnotations: FaceAnnotations
) {
  console.log("Start Cropping");
  const cropStatus = await cropFacesAndSave(imageId, faceAnnotations);
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
    where: { imageId },
    data: {
      statusImageCropping: !!cropStatus //&& cropExists[0]
        ? "CompletedActionStatus"
        : "FailedActionStatus",
    },
  });
}
