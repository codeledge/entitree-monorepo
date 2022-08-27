import { EpisodeExtended } from "../import/readFeed";
import { getItunesShowEpisodes } from "@codeledge/podcast";

export async function mergeWithApple(
  episodes: EpisodeExtended[],
  itunesShowId: number
) {
  let apple = await getItunesShowEpisodes(itunesShowId);
  for (let i in episodes) {
    let match = apple.filter(
      (episode) => episode.episodeGuid === episodes[i].guid
    );
    if (match.length) {
      episodes[i].itunesId = match[0].trackId;
    }
  }
  return episodes;
}
