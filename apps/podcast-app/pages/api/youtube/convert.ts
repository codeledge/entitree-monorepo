import type { NextApiRequest, NextApiResponse } from "next";

import { getWikidataEditObject } from "../../../src/youtube/getWikidataEditObject";
import videos from "../../../src/test/Youtube-Johnny Harris-UCmGSJVG3mCRXVOP4yZrU1Dw-2022-04-30.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { id } = req.query;
  const channelId = id as string;
  // console.log(someName)
  let edits = []
  for(let video of videos){
  const ids = getWikidataEditObject(video);
  edits.push(ids)
}
  res.json(edits);
}
