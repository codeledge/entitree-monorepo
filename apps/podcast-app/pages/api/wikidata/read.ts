import {
  DESCRIPTIONS,
  DESCRIPTIONS_DEFAULT,
} from "../../../src/podcastDescriptions";
import type { NextApiRequest, NextApiResponse } from "next";

import { getPodcastFeed } from "../../../src/wikidata/getPodcastInfo";
import { readFeed } from "../../../src/import/readFeed";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { id, spotify_token, limit, write } = req.query;
  const podcastID = id as string;
  spotify_token = spotify_token as string;
  let maxEpisodes = limit ? parseFloat(limit as string) : 0;
  const podcastInfo = await getPodcastFeed(podcastID);
  // console.log(podcastInfo);
  // if (!podcastInfo[0]?.feed) {
  //   res.json({ error: true });
  //   return;
  // }
  const feedUrl = podcastInfo[0]?.feed;
  let podcastArray = DESCRIPTIONS.find((d: any) => d.id === podcastID);
  podcastArray = { ...DESCRIPTIONS_DEFAULT, ...podcastArray };
  console.log(podcastArray);
  if (!podcastArray) {
    res.json({});
    return;
  }
  if (podcastArray?.presenter) {
    podcastArray.presenterId = podcastInfo[0].presenter.value;
  }
  if (!podcastArray?.spotifyShowId) {
    podcastArray.spotifyShowId = podcastInfo[0].spotifyShowId;
  }
  if (!podcastArray?.itunesShowId) {
    podcastArray.itunesShowId = parseFloat(podcastInfo[0].itunesShowId);
  }
  const feed = await readFeed({
    id: podcastID,
    feedUrl,
    custom: podcastArray,
    spotify_token,
    maxEpisodes,
    write: !!write,
  });
  res.json(feed);
}
