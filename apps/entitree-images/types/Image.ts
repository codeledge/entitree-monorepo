// import { ActionStatusType } from "schema-dts";
import { google } from "@google-cloud/vision/build/protos/protos";

export type FaceAnnotations = google.cloud.vision.v1.IFaceAnnotation[];
export type GoogleImageResponse =
  google.cloud.vision.v1.IAnnotateImageResponse[];

export type UploadImage = {
  base64: string;
  size: number;
  type: string;
  title: string;
};
