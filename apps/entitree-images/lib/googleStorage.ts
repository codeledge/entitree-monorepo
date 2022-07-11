import { Storage } from "@google-cloud/storage";
import { get } from "lodash";

// Instantiate a storage client with credentials
const storage = new Storage({
  credentials: {
    client_email: process.env.GCLOUD_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  },
});

const BUCKET_NAME = process.env.GC_BUCKET!;

export const BUCKET_BASE = "gs://" + BUCKET_NAME + "/";

export const BUCKET = storage.bucket(BUCKET_NAME);

export const uploadAndGetPublicFile = async (
  fileName: string,
  data: Blob | string,
  defaultMimeType?: string
) => {
  const [bucketExist] = await storage.bucket(BUCKET_NAME).exists();
  if (!bucketExist) {
    await storage.createBucket(BUCKET_NAME);
  }

  const file = storage.bucket(BUCKET_NAME).file(fileName);

  const fileOptions = {
    public: true,
    resumable: false,
    metadata: { contentType: base64MimeType(data) || defaultMimeType },
    validation: false,
  };
  if (typeof data === "string") {
    const base64EncodedString = data.replace(/^data:\w+\/\w+;base64,/, "");
    const fileBuffer = Buffer.from(base64EncodedString, "base64");
    await file.save(fileBuffer, fileOptions);
  } else {
    await file.save(get(data, "buffer", data), fileOptions);
  }
  const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${fileName}`;

  const [metadata] = await file.getMetadata();
  return {
    ...metadata,
    publicUrl,
  };
};

export enum ImageType {
  original = "original",
  without_bg = "without_bg",
  transparent_face = "transparent_face",
  transparent_head = "transparent_head",
  transparent_head_highres = "transparent_head_highres",
  face = "face",
  head = "head",
  // faceDetection = "faceDetection", //moved to mongodb
}

export function createFilePath(
  imageType: ImageType,
  id: number,
  publicURL = false
) {
  const reqFile = `uploads/${imageType}/${id.toString()}${
    imageType === ImageType.original || imageType === ImageType.without_bg
      ? ""
      : ".webp"
  }`;

  if (publicURL) {
    return BUCKET.file(reqFile).publicUrl();
  }
  return reqFile;
}

export const deleteFilesById = async (id) => {
  for (let i in ImageType) {
    try {
      await BUCKET.file(createFilePath(ImageType[i], id)).delete();
    } catch (error: any) {
      if (error.code === 404) {
        console.log("not found" + createFilePath(ImageType[i], id));
      } else {
        throw error;
      }
    }
  }
};

//https://gist.github.com/jdnichollsc/f10638d44f0a9cc6bd03a1733c896f39
export function base64MimeType(encoded: any): null | string | any {
  var result: null | string | any = null;

  if (typeof encoded !== "string") {
    return result; //What the fuck is this?!
  }

  var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

  if (mime && mime.length) {
    result = mime[1];
  }

  return result;
}
