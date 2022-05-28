import {
  BUCKET,
  ImageType,
  createFilePath,
  uploadAndGetPublicFile,
} from "./googleStorage";

import FormData from "form-data";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import sharp from "sharp";

const removeBg = async (id) => {
  console.log("Start Remove");
  const streamPipeline = promisify(pipeline);

  const formData = new FormData();
  //Temp file needed for calling the API
  const tmpFile = path.join(".", "uploads", "tmpFile" + Math.random());
  await BUCKET.file("uploads/original/" + id + "").download({
    destination: tmpFile,
  });
  //also supports image_file_base64, but couldn't figure out how to convert GS File to Base64
  formData.append("image_file", fs.createReadStream(tmpFile));

  const response = await fetch("https://sdk.photoroom.com/v1/segment", {
    method: "POST",
    headers: {
      "x-api-key": process.env.PHOTOROOM_API_KEY!,
    },
    body: formData,
  });
  if (response.status > 300) {
    console.log("Failed here's the resp", response);
    //ie. 403, you are not allowed
    //ie 402 payment required
    return false;
  }
  await streamPipeline(response.body!, fs.createWriteStream(tmpFile));

  const webp = await sharp(tmpFile)
    .toFormat("webp")
    .toBuffer();

  const publicFile = await uploadAndGetPublicFile(
    createFilePath(ImageType.without_bg, id),
    webp.toString("base64")
  );
  await fs.unlinkSync(tmpFile);
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
