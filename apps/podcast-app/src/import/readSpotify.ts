import { DateTime } from "luxon";
import { READ_FEED } from "./readFeed";
import { convertSpotifyToFeed } from "../spotify/getEpisodes";
import { getSpotifyShowEpisodes } from "@entitree/helper";
import { getWikidataEditObject } from "./getWikidataEditObject";
import { latestEpisode } from "../wikidata/getEpisodes";

//https://developer.spotify.com/console/post-playlists/
const token = process.env.SPOTIFY_TOKEN as string;

export async function readSpotify(input: READ_FEED) {
  let latest = await latestEpisode(input.id);
  if (latest.data == 0) {
    latest.data = [{ publicationDate: "2000-01-01" }];
  } else if (!latest || !latest.data || !latest.data[0].publicationDate) {
    return [];
  }
  let latestDate = DateTime.fromISO(latest.data[0].publicationDate);
  let res = convertSpotifyToFeed(
    await getSpotifyShowEpisodes(input.custom.spotifyShowId, token, latestDate)
  );
  input.custom.spotifyOnly = true;
  let parsedEpisodes = [];
  for (let i in res.reverse()) {
    let pubDate = DateTime.fromISO(res[i].pubDate);
    //only create new episodes
    if (latestDate.plus({ days: 1 }) < pubDate) {
      let created = await getWikidataEditObject(res[i], input);
      parsedEpisodes.push(created);
    }
  }
  return parsedEpisodes;
}
