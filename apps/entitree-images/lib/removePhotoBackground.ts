import {
  BUCKET,
  ImageType,
  createFilePath,
  uploadAndGetPublicFile,
} from "./googleStorage";

import fetch from "node-fetch";
import sharp from "sharp";

const removeBg = async (id) => {
  console.log("Start Remove");

  const file = await BUCKET.file("uploads/original/" + id + "").download();

  const response = await fetch("https://sdk.photoroom.com/v1/segment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-api-key": process.env.PHOTOROOM_API_KEY!,
    },
    body: JSON.stringify({
      image_file_b64: file[0].toString("base64"),
    }),
  });
  if (response.status > 300) {
    console.log("Failed here's the resp", response);
    //ie. 403, you are not allowed
    //ie. 402 payment required
    return false;
  }

  const result: any = await response.json();
  var img = Buffer.from(result.result_b64, "base64");
  const webp = await sharp(img).toFormat("webp").toBuffer();

  const publicFile = await uploadAndGetPublicFile(
    createFilePath(ImageType.without_bg, id),
    webp.toString("base64")
  );
  return true;
};
export default async function removePhotoBackground(id: number) {
  try {
    const finalDump = await removeBg(id);
    return finalDump;
  } catch (err) {
    console.log(err);
    return false;
  }
}
