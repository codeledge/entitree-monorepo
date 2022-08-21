import { EpisodeExtended } from "../feed/types";
import { PodcastParse } from "../popularPodcasts/types";
import { convertFeedEpisodeToWikidata } from "./convertFeedEpisodeToWikidata";

export async function convertFeedToWikidata(
  episodes: EpisodeExtended[],
  podcast?: PodcastParse
) {
  const episodesWikidata = await Promise.all(
    episodes.map(async (episode) => {
      const episodeWikidata = await convertFeedEpisodeToWikidata(
        episode,
        podcast
      );
      return episodeWikidata;
    })
  );
  return episodesWikidata;
}
