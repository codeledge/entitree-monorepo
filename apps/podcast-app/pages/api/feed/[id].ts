import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  try {
    const feed = fs.readFileSync(
      path.resolve(__dirname, "../../../../../public/feeds/" + id + ".xml")
    );
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/xml");
    res.end(feed);
  } catch (er) {
    res.statusCode = 404;
    res.end("404 Not Found");
  }
}
