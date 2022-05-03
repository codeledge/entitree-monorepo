import { EpisodeExtended } from "../import/readFeed";

export async function mergeWithWikidata(
  episodes: EpisodeExtended[],
  episodesWikidata: any
) {
  for (let i in episodes) {
    let match = episodesWikidata.filter(
      (episode: any) =>
        (episode.spotifyId && episode.spotifyId === episodes[i].spotifyId) ||
        (episode.itunesId && episode.itunesId === episodes[i].itunesId) ||
        (episode.title && episode.title === episodes[i].title) ||
        (episode.url && episode.url === episodes[i].enclosure.url)
    );
    if (match.length) {
      episodes[i].wikidataId = match[0].item.value;
    }
  }
  return episodes;
}
