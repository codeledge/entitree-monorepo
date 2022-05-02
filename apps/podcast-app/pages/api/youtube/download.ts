import type { NextApiRequest, NextApiResponse } from "next";

import { runChannelByPlaylist } from "../../../src/youtube/downloadChannel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { id } = req.query;
  const channelId = id as string;
  const ids = await runChannelByPlaylist(channelId);
  res.json(ids);
}
