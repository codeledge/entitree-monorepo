import type { NextApiRequest, NextApiResponse } from "next";

import { createXML } from "../../../src/feedCreation/createXML";
import fs from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const feed = await createXML(id as string, 0);
  if (!feed || feed === null) {
    res.statusCode = 404;
    res.json({ error: "Not valid Podcast (P31 must be set)", fetched: false });
  }
  console.log(__dirname);
  fs.writeFileSync(
    path.resolve(__dirname, "../../../../../public/feeds/" + id + ".xml"),
    feed as string
  );
  res.statusCode = 200;
  res.json({
    url: "/api/feed/" + id + "",
    fetched: true,
    msg: "Success, please check feed",
    error: false,
  });
}
