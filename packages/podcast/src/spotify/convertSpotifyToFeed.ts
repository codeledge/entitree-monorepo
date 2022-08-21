import { SpotifyEpisodeObject } from "./types";
import { EpisodeExtended, EpisodeType } from "../feed/types";

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
      image: { url: item.images[0].url },
      author: "",
      summary: "",
      enclosure: { url: "" },
      lastBuildDate: "",
    };
    items.push(itemFeed);
  }
  return items;
}
