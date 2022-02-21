//itunes.apple.com/lookup?id=1251196416&country=US&media=podcast&entity=podcastEpisode&limit=100
import axios from "axios";

export async function getItunesShowEpisodes(itunesId: number): Promise<any[]> {
  const results = (
    await axios.get(
      "https://itunes.apple.com/lookup?id=" +
        itunesId +
        "&country=US&media=podcast&entity=podcastEpisode&limit=100000"
    )
  ).data.results.filter(
    (episode: any) => episode.wrapperType === "podcastEpisode"
  );

  return results;
}
