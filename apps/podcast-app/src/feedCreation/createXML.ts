import { DESCRIPTIONS, DESCRIPTIONS_DEFAULT } from "../podcastDescriptions";
import {
  WDQ_EXPLICIT_EPISODE,
  WDQ_PODCAST,
  getSimplifiedWikidataEntities,
  getWikipediaDescription,
} from "@entitree/helper";
import path, { dirname } from "path";
import { Podcast } from "podcast";
import fs from "fs";
import { getEpisodesById } from "../wikidata/getEpisodes";
import { getPodcastInfo } from "@codeledge/podcast";

export async function createXML(
  podcastId: any,
  limit: number
): Promise<string | null> {
  const podcast: any = (await getSimplifiedWikidataEntities([podcastId]))[
    podcastId
  ];
  if (!podcast.claims) {
    return null;
  }
  const claims = podcast.claims;
  let descr = "";
  if (claims.P5842) {
    descr += `<br />External links: https://podcasts.apple.com/podcast/id${claims.P5842[0].value}`;
    //<a href="https://podcasts.apple.com/podcast/id${claims.P5842[0].value}">Apple Podcasts</a>
  }
  if (!claims.P31) {
    return null;
  }
  if (!claims.P31.map((claim: any) => claim.value).includes(WDQ_PODCAST)) {
    return null;
  }
  const podcastInfo = await getPodcastInfo(podcastId);
  console.log(podcastInfo);
  const episodes = await getEpisodesById(podcastId, limit);
  descr += `<br />This podcast might be out of date. Contact us to have it updated.<a href="${episodes.link}" target="_blank"></a>`;
  // if (podcastInfo.topics) {
  //   descr += `<br />Topics: ${podcastInfo.topics}`;
  // }
  let imageUrl =
    "https://upload.wikimedia.org/wikipedia/commons/2/27/Square%2C_Inc_-_Square_Logo.jpg";
  // if (podcastInfo.logo) {
  //   imageUrl = podcastInfo.logo;
  // }
  let podcastArray = DESCRIPTIONS.find((d: any) => d.id === podcastId);
  podcastArray = { ...DESCRIPTIONS_DEFAULT, ...podcastArray };
  if (podcastArray) {
    descr = `${podcastArray.description}<br />${descr}`;
    if (podcastArray.img) {
      imageUrl = podcastArray.img;
    }
  }
  const feed = new Podcast({
    title: podcast.labels[podcastArray.languageCode!],
    description:
      descr +
      `<br /><br />This podcast is auto-generated.<br>Language: ${podcastInfo.language?.label}`,
    feedUrl: "https://podcast.nothispute.com/api/feed/" + podcastId + "",
    siteUrl: claims.P856?.[0].value,
    imageUrl: imageUrl,
    // docs: "http://example.com/rss/docs.html",
    // author: "Dylan Greene",
    // managingEditor: "Dylan Greene",
    // webMaster: "Dylan Greene",
    // copyright: "2013 Dylan Greene",
    language: podcastInfo.language?.value || "en",
    // categories: ["Category 1", "Category 2", "Category 3"],
    pubDate: claims.P580?.value,
    ttl: 60,
    // itunesAuthor: "Max Nowack",
    // itunesSubtitle: "I am a sub title",
    // itunesSummary: "I am a summary",
    itunesOwner: {
      name: "Podcast Wikidata",
      email: "podcast.wikidata@gmail.com",
    },
    itunesExplicit: false,
    itunesCategory: [
      {
        text: "Entertainment",
        subcats: [
          {
            text: "Television",
          },
        ],
      },
    ],
    itunesImage: imageUrl,
  });

  // console.log(episodes.data);
  for (const episode of episodes.data) {
    /* loop over data and add to feed */
    episode.wikidataUrl = `https://www.wikidata.org/wiki/${episode.item.value}`;
    let desc = ``;
    // let desc = `This is an episode. <br />Item on Wikidata: ${episode.wikidataUrl}`;
    if (episode.guests && !episode.guests.match(/\.well-known/)) {
      desc += `<br />Guests: ${episode.guests}`;
    }
    if (episode.topics) {
      desc += `<br />Topics: ${episode.topics}`;
    }
    if (episode.recordedAtLabel) {
      desc += `<br />Recorded at: ${episode.recordedAtLabel}`;
    }
    console.log(episode.recordingDate);
    if (episode.recordingDate) {
      let formattedDate = episode.recordingDate.substring(0, 10);
      desc += `<br />Recorded: ${formattedDate}`;
    }
    // if (episode.wikipedia) {
    //   let wikipediaGuests = episode.wikipedia.split("|");
    //   desc +=
    //     `<br />` +
    //     (await getWikipediaDescription(
    //       wikipediaGuests,
    //       podcastArray.languageCode!
    //     ));
    // }
    if (!episode.url && episode.youtube && podcastArray.download) {
      const file =
        process.env.PROJECT_ROOT + "/public/yt/" + episode.youtube + ".mp3";
      console.log(file);
      if (fs.existsSync(file)) {
        episode.url =
          "https://podcast.nothispute.com/yt/" + episode.youtube + ".mp3";
      }
    }
    if (!episode.url) {
      continue;
    }
    const url = new URLSearchParams({
      url: episode.url,
      id: podcastId,
    }).toString();
    feed.addItem({
      title: episode.title || episode.item.label, //use label as fallback
      description: desc,
      // url: "http://example.com/article4?this&that", // link to the item
      guid: episode.item.value, // use Wikidata ID, optional - defaults to url
      // categories: ["Category 1", "Category 2", "Category 3", "Category 4"], // optional - array of item categories
      // author: "Guest Author", // optional - defaults to feed author property
      date: episode.publicationDate, // any format that js Date can parse.
      enclosure: { url: "https://podcast.nothispute.com/api/redirect?" + url }, // optional enclosure
      itunesDuration: episode.duration,
      itunesExplicit: episode.hasQuality?.value == WDQ_EXPLICIT_EPISODE,
      itunesEpisode: episode.episodeNumber
        ? episode.episodeNumber
        : episode.productionCode,
      itunesSeason: episode.seasonNumber,
    });
  }
  const xml = feed.buildXml();
  return xml;
}
