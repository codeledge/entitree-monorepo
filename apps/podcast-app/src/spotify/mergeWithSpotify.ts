import { DateTime } from "luxon";
import { EpisodeExtended } from "../import/readFeed";
import { getSpotifyShowEpisodes } from "@entitree/helper";

export async function mergeWithSpotify(
  episodes: EpisodeExtended[],
  spotifyShowId: string,
  latestDate: DateTime,
  spotify_token: string
) {
  let spotifyEpisodes = await getSpotifyShowEpisodes(
    spotifyShowId,
    spotify_token,
    latestDate
  );
  for (let i in episodes) {
    let match = spotifyEpisodes.filter(
      (episode) =>
        episode.name === episodes[i].title || //match title because Spotify doesn't have GUID
        (episode.release_date &&
          episode.duration_ms &&
          episode.release_date === episodes[i].pubDate &&
          episode.duration_ms / 1000 - episodes[i].duration < 3) //match same pubDate and duration
    );
    if (match.length) {
      episodes[i].spotifyId = match[0].href.split("episodes/")[1];
    } else {
      console.log("cound't find spotify for: " + episodes[i].title);
    }
  }
  return episodes;
}
