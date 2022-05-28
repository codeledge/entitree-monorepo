import { BUCKET, ImageType, createFilePath } from "./googleStorage";
import ImageModel, { FaceAnnotations } from "../models/Image";
import { MetricType, updateMetric } from "./statsUpdater";
import { cropFacesAndSave, detectFaces } from "./faceDetection";

import removePhotoBackground from "./removePhotoBackground";

export async function process1_removeBackground(id: number) {
  await ImageModel.updateOne(
    { id },
    {
      statusBackgroundRemoval: "ActiveActionStatus",
    }
  );
  const success = await removePhotoBackground(id);
  await updateMetric(MetricType.backgroundRemoval);
  return await ImageModel.updateOne(
    { id },
    {
      statusBackgroundRemoval: success
        ? "CompletedActionStatus"
        : "FailedActionStatus",
    }
  );
}

export async function process2_detectFaces(id: number) {
  const googleVisionObject = await detectFaces(
    createFilePath(ImageType.without_bg, id)
  );
  const faceAnnotations = googleVisionObject[0].faceAnnotations;
  console.log(googleVisionObject);
  await ImageModel.updateOne(
    { id },
    {
      faceDetectionGoogleVision: googleVisionObject,
      statusGoogleFaceDetection:
        !!faceAnnotations && faceAnnotations.length
          ? "CompletedActionStatus"
          : "FailedActionStatus",
    }
  );
  await updateMetric(MetricType.googleCloudVisionFaceDetection);
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
  await ImageModel.updateOne(
    { id },
    {
      statusImageCropping: !!cropStatus //&& cropExists[0]
        ? "CompletedActionStatus"
        : "FailedActionStatus",
    }
  );
}
