// import { EpisodeType } from "podparse";
import { EpisodeExtended, EpisodeType } from "../feed/types";
import { ItunesEpisodeObject } from "./types";

export function convertItunesToFeed(
  episodes: ItunesEpisodeObject[]
): EpisodeExtended[] {
  let items = [];
  for (const item of episodes) {
    let itemFeed: EpisodeExtended = {
      title: item.trackName,
      duration: item.trackTimeMillis / 1000,
      pubDate: item.releaseDate,
      explicit: false, //TODO
      description: item.description,
      guid: item.episodeGuid,
      episodeType: EpisodeType.Full, //doublecheck
      itunesId: item.trackId,
      image: { url: item.artworkUrl600 },
      author: "",
      summary: "",
      enclosure: { url: "" },
      lastBuildDate: "",
    };
    items.push(itemFeed);
  }
  return items;
}
