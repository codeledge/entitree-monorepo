import type { NextApiRequest, NextApiResponse } from "next";

import { createCanvas } from "canvas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.size) {
    res.json({ error: true });
  }
  if (!req.query.cut) {
    res.json({ error: true });
  }
  const size = +req.query.size;
  const height = size;
  const padding = height / 1.5 / 2 / 2;
  const canvas = createCanvas(height, height);

  if (req.query.cut == "both_sides") {
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    //fillRect(x, y, width, height);
    context.fillRect(padding, 0, height - padding * 2, height);
  }
  if (req.query.cut == "left_side") {
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(padding, 0, height, height);
  }
  if (req.query.cut == "left_shoulder") {
    const context = canvas.getContext("2d");
    //make all right side white and top white
    context.fillStyle = "white";
    context.fillRect(padding, 0, height, height);
    context.fillRect(0, 0, height, height - padding);
  }
  const buffer = canvas.toBuffer("image/png");
  res.setHeader("Content-Type", "image/png");
  res.send(buffer);
}
