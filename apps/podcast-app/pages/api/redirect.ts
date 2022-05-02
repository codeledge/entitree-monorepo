import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;
  console.log(req.query, url);
  res.writeHead(302, {
    // or 301
    Location: url,
  });
  res.end();
}
