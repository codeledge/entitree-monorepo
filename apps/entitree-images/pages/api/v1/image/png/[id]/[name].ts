import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

//get webp and convert to png
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  const url = `https://storage.googleapis.com/entitree-images.appspot.com/uploads/without_bg/${id}`;
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });
  const buffer = Buffer.from(response.data, "binary");
  res.setHeader("Content-Type", "image/png");
  res.setHeader("Content-Length", buffer.length);
  res.send(buffer);
}
