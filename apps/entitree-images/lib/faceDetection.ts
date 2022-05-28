import {
  BUCKET,
  BUCKET_BASE,
  ImageType,
  createFilePath,
} from "./googleStorage";
import { FaceAnnotations, GoogleImageResponse } from "./../models/Image";

import sharp from "sharp";
import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient();

interface Coor {
  w: number;
  h: number;
  x: number;
  y: number;
}

//https://github.com/lovell/sharp/issues/737
//https://github.com/tu4mo/pizzagram/blob/45d45bb33953ee23343f1e6554e236f38ada9404/functions/src/utils/generate-thumbnail.ts
async function crop(
  id: number,
  coor: Coor,
  pixels: number,
  read: ImageType = ImageType.without_bg,
  write: ImageType = ImageType.face
) {
  const remoteWriteStream = BUCKET.file(
    createFilePath(write, id)
  ).createWriteStream();
  const pipeline = sharp();

  const added_pixels = coor.w * 2;
  coor = {
    w: coor.w,
    h: coor.h,
    x: coor.x + added_pixels,
    y: coor.y + added_pixels,
  };
  pipeline
    .extend({
      top: added_pixels,
      bottom: added_pixels,
      left: added_pixels,
      right: added_pixels,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer()
    .then((data) =>
      sharp(data)
        .extract({ width: coor.w, height: coor.h, left: coor.x, top: coor.y }) //extract square face
        .resize(Math.min(pixels, coor.w))
        .toFormat("webp")
        .pipe(remoteWriteStream)
    );
  console.log("writing", createFilePath(write, id));
  BUCKET.file(createFilePath(read, id)).createReadStream().pipe(pipeline);

  //TODO return false on error
  return true;
}

/**
 * Uses the Vision API to detect faces in the given file.
 */
export async function detectFaces(inputFile: string) {
  const request = {
    image: {
      source: {
        imageUri: BUCKET_BASE + inputFile,
      },
      // content: await sharp(inputFile).toBuffer().toString("base64"),
    },
  };
  // Make a call to the Vision API to detect the faces
  const results = await client.faceDetection(request);
  return results;
}

function scale(coor: Coor, scale_factor) {
  const y_extended = coor.y - coor.h * (scale_factor - 1); //set x% higher
  const h_extended = coor.h * scale_factor; //set x% longer
  const diff_w_to_h = h_extended - coor.w;
  const x_extended = coor.x - diff_w_to_h / 2;
  return {
    w: Math.round(h_extended),
    h: Math.round(h_extended),
    x: Math.round(x_extended),
    y: Math.round(y_extended),
  };
}

export async function cropFacesAndSave(imageNumber, faces: FaceAnnotations) {
  const face = faces[0];
  if (
    !face?.boundingPoly?.vertices?.every(({ x, y }) => {
      return x !== null && x !== undefined && y !== null && y !== undefined;
    })
  ) {
    console.log("failed boundingPoly", face);
    return false; // or the script will crash
  }
  const coor_orignal: Coor = {
    x: face.boundingPoly.vertices[0].x!,
    y: face.boundingPoly.vertices[0].y!,
    w: face.boundingPoly.vertices[2].x! - face.boundingPoly.vertices[0].x!,
    h: face.boundingPoly.vertices[2].y! - face.boundingPoly.vertices[0].y!,
  };
  const coor = scale(coor_orignal, 1); //needed to make square
  const coor_extended = scale(coor, 1.5);

  await crop(
    imageNumber,
    coor,
    100,
    ImageType.without_bg,
    ImageType.transparent_face
  );
  await crop(
    imageNumber,
    coor_extended,
    300,
    ImageType.without_bg,
    ImageType.transparent_head
  );
  await crop(
    imageNumber,
    coor_extended,
    600,
    ImageType.without_bg,
    ImageType.transparent_head_highres
  );
  await crop(imageNumber, coor, 200, ImageType.original, ImageType.face);
  return true;
}
