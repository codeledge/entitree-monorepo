import {
  getItunesShowEpisodes,
  getSpotifyShowEpisodes,
} from "@entitree/helper";
import getPodcastFromFeed, { Episode, Podcast } from "podparse";

import { DateTime } from "luxon";
import axios from "axios";
import fs from "fs";
import { getWikidataEditObject } from "./getWikidataEditObject";
import { latestEpisode } from "../wikidata/getEpisodes";
import path from "path";

export type d = {
  id: string;
  feedUrl: string;
  custom: any;
  spotify_token?: string;
  maxEpisodes?: number;
  write: boolean;
};

//https://developer.spotify.com/console/post-playlists/
const token = process.env.SPOTIFY_TOKEN as string;

export interface EpisodeExtended extends Episode {
  spotifyId?: string;
  itunesId?: number;
  fyydId?: string;
  panoptikumId?: string;
  wikidataId?: string;
}

export async function readFeed(input: d) {
  let feed = (await axios.get(input.feedUrl)).data;
  // let feed = await fs.readFileSync(
  //   "/home/martin/workspace/wikidata-to-podcast-xml/src/example/example.xml",
  //   "utf-8"
  // );
  let res = getPodcastFromFeed(feed);
  let latest = await latestEpisode(input.id, 10000);
  if (latest.data == 0) {
    latest.data = [{ publicationDate: "2000-01-01" }];
  } else if (!latest || !latest.data || !latest.data[0].publicationDate) {
    return [];
  }
  let latestDate = DateTime.fromISO(latest.data[0].publicationDate);

  // let latestDate = DateTime.fromISO("2021-12-30");
  let episodes = res.episodes as EpisodeExtended[];
  episodes = await mergeWithApple(episodes, input.custom.itunesShowId);
  try {
    episodes = await mergeWithSpotify(
      episodes,
      input.custom.spotifyShowId,
      latestDate,
      input.spotify_token ? (input.spotify_token as string) : token
    );
  } catch (e) {
    throw new Error(
      "Could not get spotify episodes, please set access token using &spotify_token=xxx, please get a token here https://developer.spotify.com/console/post-playlists/"
    );
  }
  // return latest.data;
  episodes = await mergeWithWikidata(episodes, latest.data);
  let parsedEpisodes: any[] = [];

  //only create new episodes
  episodes = episodes
    .reverse()
    .filter(
      (episode) =>
        latestDate.plus({ days: 1 }) < DateTime.fromISO(episode.pubDate)
    );
  // return episodes;
  // await Promise.all(
  //   res.episodes.reverse().map(async (episode) => {
  let length = input.maxEpisodes ? input.maxEpisodes : episodes.length;
  for (let i = 0; i < length; i++) {
    let episode = episodes[i];
    console.log(episode.title);
    let newItemObject = await getWikidataEditObject(episode, input);
    // await new Promise((resolve) => setTimeout(resolve, 100000));
    parsedEpisodes.push(newItemObject);
  }
  fs.writeFileSync(
    path.resolve(
      __dirname,
      "../../../../../public/wikidata/create" + input.id + ".json"
    ),
    JSON.stringify(parsedEpisodes)
  );
  return parsedEpisodes;
}

async function mergeWithWikidata(
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

async function mergeWithApple(
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

async function mergeWithSpotify(
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

// export async function readSpotify(input: d) {
//   let latest = await latestEpisode(input.id);
//   if (latest.data == 0) {
//     latest.data = [{ publicationDate: "2000-01-01" }];
//   } else if (!latest || !latest.data || !latest.data[0].publicationDate) {
//     return [];
//   }
//   let latestDate = DateTime.fromISO(latest.data[0].publicationDate);
//   // console.log(input.custom.itunesShowId);
//   let res = convertSpotifyToFeed(
//     await getShowEpisodes(input.custom.spotifyShowId, token, latestDate)
//   );
//   // console.log(res);
//   // return res;
//   input.custom.spotifyOnly = true;
//   let parsedEpisodes = [];
//   for (let i in res.reverse()) {
//     let pubDate = DateTime.fromISO(res[i].pubDate);
//     //only create new episodes
//     if (latestDate.plus({ days: 1 }) < pubDate) {
//       let created = await createItem(res[i], input);
//       parsedEpisodes.push(created);
//     }
//   }
//   return parsedEpisodes;
// }
