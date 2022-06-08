import { SpotifyEpisodeObject } from "@entitree/helper";
import { Episode, EpisodeType } from "podparse";

import { EpisodeExtended } from "../import/readFeed";

export function convertSpotifyToFeed(
  episodes: SpotifyEpisodeObject[]
): EpisodeExtended[] {
  let items = [];
  for (const item of episodes) {
    let itemFeed: EpisodeExtended = {
      //https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-episode
      title: item.name,
      duration: item.duration_ms / 1000,
      pubDate: item.release_date,
      explicit: item.explicit,
      description: item.description,
      guid: item.href,
      episodeType: EpisodeType.Full, //doublecheck
      spotifyId: item.href.split("episodes/")[1],
      image: item.images[0].url,
      author: "",
      summary: "",
      enclosure: { url: "" },
      // episodeType: EpisodeType.Full,//error check
      lastBuildDate: "",
    };
    items.push(itemFeed);
  }
  return items;
}
