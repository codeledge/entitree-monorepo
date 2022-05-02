import { EpisodeExtended, d } from "./readFeed";
import {
  WDQ_EPISODE_TYPE_MATCH,
  WDQ_EXPLICIT_EPISODE,
  WDQ_INFERRED_FROM_PODCAST_DESCRIPTION,
  WDQ_INFERRED_FROM_TITLE,
  WDQ_PODCAST_EPISODE,
  WDQ_SECOND,
  WD_APPLE_PODCASTS_PODCAST_EPISODE_ID,
  WD_BASED_ON_HEURISTIC,
  WD_CONTENT_DELIVERER,
  WD_DURATION,
  WD_FILE_FORMAT,
  WD_FULL_WORK_AVAILABLE_AT_URL,
  WD_HAS_QUALITY,
  WD_INSTANCE_OF,
  WD_PART_OF_THE_SERIES,
  WD_PODCAST_LOGO_URL,
  WD_PRESENTER,
  WD_PRODUCTION_CODE,
  WD_PUBLICATION_DATE,
  WD_RECORDING_DATE,
  WD_SEASON,
  WD_SERIES_ORDINAL,
  WD_SPOTIFY_SHOW_EPISODE_ID,
  WD_STATED_IN_REFERENCE_AS,
  WD_TALK_SHOW_GUEST,
  WD_TITLE,
} from "@entitree/helper";
import {
  extractGuests,
  extractProductionCode,
  extractRecordingDate,
} from "./podcastExtracter";

import { generalConfig } from "./wikidataConfig";
import { searchGuest } from "./searchGuests";

export async function getWikidataEditObject(
  episode: EpisodeExtended,
  podcast: d
) {
  const language = "en";
  let wikidataLabel = episode.title;
  if (podcast?.custom?.prefix) {
    wikidataLabel = podcast.custom.prefix + wikidataLabel;
  }
  const labels = {
    [language]: wikidataLabel,
  };
  const aliases = {
    [language]: episode.title,
  };
  const descriptions = {
    [language]: "podcast episode",
  };
  let url = episode.enclosure.url;
  let contentDelieverer = null;
  let fileFormat = "Q42591";
  if (url.match("traffic.megaphone.fm/")) {
    url =
      "https://traffic.megaphone.fm/" +
      url.split("traffic.megaphone.fm/")[1].split("?")[0];
    contentDelieverer = "Q29096473";
  }
  let cleanTitle = episode.title;
  if (podcast.custom?.remove) {
    cleanTitle = cleanTitle.replace(podcast.custom?.remove[0], "");
  }
  let guests = extractGuests(
    cleanTitle,
    podcast?.custom?.guestMatch,
    podcast?.custom?.guestMatchIndex
  );
  let today = new Date().toJSON().slice(0, 10);
  const reference = { P854: podcast.feedUrl, P813: today };
  let claims: any = {
    [WD_INSTANCE_OF]: [WDQ_PODCAST_EPISODE],
    [WD_TITLE]: [{ text: episode.title, language }],
    [WD_PART_OF_THE_SERIES]: [podcast.id],
    [WD_DURATION]: [{ amount: Math.floor(episode.duration), unit: WDQ_SECOND }],
    [WD_PUBLICATION_DATE]: [
      {
        value: episode.pubDate.substring(0, 10),
      },
    ],
  };
  if (url) {
    claims[WD_FULL_WORK_AVAILABLE_AT_URL] = [
      {
        value: url,
        qualifiers: {
          [WD_CONTENT_DELIVERER]: contentDelieverer,
          [WD_FILE_FORMAT]: fileFormat,
        },
        references: [reference],
      },
    ];
  }
  if (podcast.custom.seasons && episode.season) {
    let currentSeason = podcast.custom.seasons[episode.season];
    claims[WD_SEASON] = [
      {
        value: currentSeason,
        qualifiers: {
          [WD_SERIES_ORDINAL]: episode.episode?.toString(),
        },
        // references: [reference],
      },
    ];
  }

  if (podcast.custom?.presenterId) {
    claims[WD_PRESENTER] = [{ value: podcast.custom.presenterId }];
  }
  if (guests) {
    for (let guestId in guests) {
      if (!claims[WD_TALK_SHOW_GUEST]) {
        claims[WD_TALK_SHOW_GUEST] = [];
      }
      let guest = guests[guestId];
      let guestWikidata = await searchGuest(guest);
      let references = {
        [WD_BASED_ON_HEURISTIC]: WDQ_INFERRED_FROM_TITLE,
        [WD_STATED_IN_REFERENCE_AS]: guest,
      };
      if (guestWikidata) {
        claims[WD_TALK_SHOW_GUEST].push({
          value: guestWikidata,
          references,
        });
      } else {
        claims[WD_TALK_SHOW_GUEST].push({
          value: {
            snaktype: "somevalue",
          },
          references,
        });
      }
    }
  }
  if (episode.image?.url) {
    claims[WD_PODCAST_LOGO_URL] = [episode.image?.url];
  }
  let recordedDate = extractRecordingDate(episode.description);
  if (recordedDate) {
    claims[WD_RECORDING_DATE] = [
      {
        time: recordedDate.value,
        references: {
          [WD_BASED_ON_HEURISTIC]: WDQ_INFERRED_FROM_PODCAST_DESCRIPTION,
          [WD_STATED_IN_REFERENCE_AS]: recordedDate.statedAs,
        },
      },
    ];
  }
  let hasQuality = [];
  if (episode.explicit) {
    hasQuality.push(WDQ_EXPLICIT_EPISODE);
  }
  const episodeTypeId = WDQ_EPISODE_TYPE_MATCH[episode.episodeType];
  if (episode.episodeType && episode.episodeType !== "full") {
    hasQuality.push(episodeTypeId);
  }
  if (episode.explicit) {
    claims[WD_HAS_QUALITY] = hasQuality;
  }
  if (episode.itunesId) {
    claims[WD_APPLE_PODCASTS_PODCAST_EPISODE_ID] = [
      { value: episode.itunesId.toString() },
    ];
  }
  if (episode.spotifyId) {
    claims[WD_SPOTIFY_SHOW_EPISODE_ID] = [
      {
        value: episode.spotifyId,
      },
    ];
  }
  let productionCode = extractProductionCode(
    cleanTitle,
    podcast?.custom?.episodeMatch
  );
  if (productionCode) {
    claims[WD_PRODUCTION_CODE] = {
      value: productionCode,
      references: {
        [WD_BASED_ON_HEURISTIC]: WDQ_INFERRED_FROM_TITLE,
      },
    };
  }
  if (podcast.custom?.addClaims) {
    claims = { ...claims, ...podcast.custom.addClaims };
  }
  // return { labels, guests, claims, des: episode.description };

  console.log(claims);
  return {
    type: "item",
    labels,
    descriptions,
    aliases,
    claims,
    sitelinks: [],
  };
  // if (podcast.write) {
  //   if (episode.wikidataId) {
  //     wbEdit.entity.edit({
  //       // Required
  //       id: episode.wikidataId,
  //       reconciliation: {
  //         mode: "skip-on-any-value",
  //       },
  //       // labels: [],
  //       descriptions,
  //       aliases,
  //       claims,
  //     });
  //     console.log("edited item id");
  //   } else {
  //     const { entity } = await wbEdit.entity.create({
  //       type: "item",
  //       labels,
  //       descriptions,
  //       aliases,
  //       claims,
  //       sitelinks: [],
  //     });
  //     console.log("created item id", entity.id);
  //   }
  // }

  // return { labels, guests, claims, des: episode.description };
}
