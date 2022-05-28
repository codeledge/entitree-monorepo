import { ActionStatusType } from "schema-dts";
import { google } from "@google-cloud/vision/build/protos/protos";
import mongoose from "mongoose";
import sequence from "mongoose-sequence";

const AutoIncrement = sequence(mongoose);

export type FaceAnnotations = google.cloud.vision.v1.IFaceAnnotation[];
export type GoogleImageResponse =
  google.cloud.vision.v1.IAnnotateImageResponse[];
export interface Image {
  _id: string;
  id: number;
  name: string;
  wikidataEntity: number;
  wikidataLabel: string;
  wikidataP31: string;
  internalFileName: string;
  originalFilename: string;
  mimetype: string;
  license: string;
  sourceUrl: string; //Consider using WebPage
  sourceHostname: string;
  sourceName: string;
  fileSize: number;
  author: string;
  comment: string;
  copyrightYear: number;
  recordedDate: Date;
  viewCount: number;
  createdBy?: object;
  uploadSite: string;
  publishedAt: string;
  editingBackgroundRemoved: boolean;
  faceDetectedGoogleVision: boolean;
  faceDetectionGoogleVision?: GoogleImageResponse;
  statusBackgroundRemoval?: ActionStatusType;
  statusGoogleFaceDetection?: ActionStatusType;
  statusImageCropping?: ActionStatusType;
  url?: any;
  downloadUrl?: string;
}

export type UploadImage = {
  base64: string;
  size: number;
  type: string;
  title: string;
};

const imageSchema = new mongoose.Schema<Image>(
  {
    id: Number,
    name: String,
    wikidataEntity: Number,
    wikidataLabel: String,
    wikidataP31: String,
    internalFileName: String,
    originalFilename: String,
    mimetype: String,
    license: String,
    sourceUrl: String,
    sourceHostname: String,
    sourceName: String,
    fileSize: Number,
    author: String,
    comment: String,
    copyrightYear: Number,
    recordedDate: Date,
    viewCount: Number,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    uploadSite: String,
    faceDetectionGoogleVision: Array,
    statusBackgroundRemoval: { type: String, default: "PotentialActionStatus" },
    statusGoogleFaceDetection: {
      type: String,
      default: "PotentialActionStatus",
    },
    statusImageCropping: { type: String, default: "PotentialActionStatus" },
    url: Object,
  },
  {
    timestamps: true,
  }
);

if (!mongoose.models.Image)
  imageSchema.plugin(AutoIncrement, { inc_field: "id" });

export default (mongoose.models.Image as mongoose.Model<Image>) ||
  mongoose.model<Image>("Image", imageSchema);
