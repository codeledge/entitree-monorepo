import axios from "axios";
import { itunesExample } from "./example";

export async function getItunesShowEpisodes(itunesId: number): Promise<any[]> {
  return itunesExample;
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
