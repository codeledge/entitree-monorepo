import { DateTime } from "luxon";
import { SpotifyEpisodeObject } from "./types";
import axios from "axios";

interface SpotifyResponse {
  next: string;
  items: SpotifyEpisodeObject[];
}

export async function getSpotifyShowEpisodes(
  playlistId: string,
  access_token: string,
  afterDate: DateTime
): Promise<SpotifyEpisodeObject[]> {
  let items: any[] = [];
  let offset = 0;
  let nextPageToken = "start";
  do {
    // console.log(
    //   "getting next page",
    //   "https://api.spotify.com/v1/shows/" + playlistId + "/episodes"
    // );
    const page: SpotifyResponse = (
      await axios.get(
        "https://api.spotify.com/v1/shows/" + playlistId + "/episodes",
        {
          headers: {
            Authorization: "Bearer " + access_token,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: {
            limit: 50,
            offset,
          },
        }
      )
    ).data;
    // console.log(page);
    offset += 50;
    nextPageToken = page.next;
    for (const item of page.items) {
      items.push(item);
    }
  } while (
    nextPageToken &&
    DateTime.fromISO(items[items.length - 1].pubDate) > afterDate
  );
  return items;
}
