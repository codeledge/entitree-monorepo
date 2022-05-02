import type { NextApiRequest, NextApiResponse } from "next";

import { createXML } from "../../src/feedCreation/createXML";

type Data = {
  error?: string;
  name?: string;
  fetched: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  // const JordanPeterson = "Q109238858";
  const podcastId = id as string;
  let limit = 0;
  if (req.query.limit) {
    limit = parseInt(req.query.limit as string);
  }

  const feed = await createXML(podcastId, limit);
  if (!feed) {
    res.statusCode = 404;
    res.json({ error: "Not valid Podcast (P31 must be set)", fetched: false });
  }
  console.log(__dirname);
  // fs.writeFileSync(
  //   __dirname + "/../../../../public/feeds/" + podcastId + ".xml",
  //   feed
  // );
  res.statusCode = 200;
  // res.setHeader("Content-Type", "application/xml");
  res.end(feed);
}
