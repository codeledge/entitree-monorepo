import getPodcastFromFeed, { Episode, Podcast } from "podparse";

import { DateTime } from "luxon";
import axios from "axios";
import fs from "fs";
import { getWikidataEditObject } from "./getWikidataEditObject";
import { latestEpisode } from "../wikidata/getEpisodes";
import { mergeWithApple } from "../apple/mergeWithApple";
import { mergeWithSpotify } from "../spotify/mergeWithSpotify";
import { mergeWithWikidata } from "../wikidata/mergeWithWikidata";
import path from "path";

export type READ_FEED = {
  id: string;
  feedUrl: string;
  custom: any;
  spotify_token?: string;
  maxEpisodes?: number;
  write: boolean;
};

export interface EpisodeExtended extends Episode {
  spotifyId?: string;
  itunesId?: number;
  fyydId?: string;
  panoptikumId?: string;
  wikidataId?: string;
}

export async function readFeed(input: READ_FEED) {
  let feed;
  if (input.id == "Qtest") {
    feed = fs.readFileSync(
      "/home/martin/workspace/wikidata-to-podcast-xml/src/example/example.xml",
      "utf-8"
    );
  } else {
    feed = (await axios.get(input.feedUrl)).data;
  }
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
  episodes = await mergeWithWikidata(episodes, latest.data);
  episodes = await mergeWithApple(episodes, input.custom.itunesShowId);
  try {
    episodes = await mergeWithSpotify(
      episodes,
      input.custom.spotifyShowId,
      latestDate,
      input.spotify_token
        ? (input.spotify_token as string)
        : (process.env.SPOTIFY_TOKEN as string)
    );
  } catch (e) {
    throw new Error(
      "Could not get spotify episodes, please set access token using &spotify_token=xxx, please get a token here https://developer.spotify.com/console/post-playlists/"
    );
  }
  let parsedEpisodes: any[] = [];

  //only create new episodes
  episodes = episodes
    .reverse()
    .filter(
      (episode) =>
        latestDate.plus({ days: 1 }) < DateTime.fromISO(episode.pubDate)
    );

  let length = input.maxEpisodes ? input.maxEpisodes : episodes.length;
  for (let i = 0; i < length; i++) {
    let episode = episodes[i];
    console.log(episode.title);
    let newItemObject = await getWikidataEditObject(episode, input);
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
