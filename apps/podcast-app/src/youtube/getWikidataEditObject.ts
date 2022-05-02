import {
  WDQ_CC_BY_30,
  WDQ_INFERRED_FROM_YOUTUBE_DESCRIPTION,
  WDQ_SECOND,
  WDQ_STANDARD_YOUTUBE_LICENSE,
  WDQ_YOUTUBE_MADE_FOR_KIDS,
  WD_BASED_ON_HEURISTIC,
  WD_COPYRIGHT_LICENSE,
  WD_DURATION,
  WD_INSTANCE_OF,
  WD_NUMBER_OF_COMMENTS,
  WD_NUMBER_OF_LIKES,
  WD_NUMBER_OF_VIEWERS_LISTENERS,
  WD_POINT_IN_TIME,
  WD_PUBLICATION_DATE,
  WD_RECORDING_DATE,
  WD_RETRIEVED,
  WD_STATED_IN_REFERENCE_AS,
  WD_TITLE,
  WD_YOUTUBE_CHANNEL_ID,
  WD_YOUTUBE_VIDEO,
  WD_YOUTUBE_VIDEO_ID,
  durationToSeconds,
} from "@entitree/helper";

import { GoogleApiYouTubeVideoResource } from "./types";
import { extractRecordingDate } from "../import/podcastExtracter";

interface GoogleApiYouTubeVideoResourcePlusAny
  extends GoogleApiYouTubeVideoResource {
  // localizations: any;
  [prop: string]: any;
}
export function getWikidataEditObject(
  video: any //GoogleApiYouTubeVideoResourcePlusAny
  // podcast: d
) {
  const language = "en";
  let wikidataLabel = video.snippet.title;
  // if (podcast?.custom?.prefix) {
  //   wikidataLabel = podcast.custom.prefix + wikidataLabel;
  // }
  let labels: any = {
    [language]: wikidataLabel,
  };
  const aliases = {
    // [language]: episode.title,
  };
  const descriptions = {
    [language]: "Youtube video",
  };
  // console.log(video.localizations);
  if (video.localizations) {
    for (let lang in video.localizations) {
      labels[lang] = video.localizations[lang].title;
    }
  }
  // console.log(labels);
  let url = "https://www.youtube.com/watch?v=" + video.id;

  // let guests = extractGuests(
  //   cleanTitle,
  //   podcast?.custom?.guestMatch,
  //   podcast?.custom?.guestMatchIndex
  // );
  let today = new Date().toJSON().slice(0, 10);
  const reference = { [WD_YOUTUBE_VIDEO_ID]: video.id, [WD_RETRIEVED]: today };
  const durationInSeconds = durationToSeconds(video.contentDetails.duration);
  const publishedDate = video.snippet.publishedAt.substring(0, 10);
  const statisticsQualifier = {
    [WD_POINT_IN_TIME]: today,
    // [WD_DETERMINATION_METHOD]: null,
  };

  let license = null;
  if (license === "youtube") {
    license = WDQ_STANDARD_YOUTUBE_LICENSE;
  } else if (license === "creativeCommon") {
    license = WDQ_CC_BY_30;
  }
  let claims: any = {
    [WD_INSTANCE_OF]: [WD_YOUTUBE_VIDEO],
    [WD_TITLE]: [{ text: wikidataLabel, language }],
    // [WD_PART_OF_THE_SERIES]: [podcast.id],
    [WD_DURATION]: [
      {
        amount: durationInSeconds,
        unit: WDQ_SECOND,
      },
    ],
    [WD_PUBLICATION_DATE]: [
      {
        value: publishedDate,
      },
    ],
    [WD_YOUTUBE_VIDEO_ID]: [
      {
        value: video.id,
        qualifiers: {
          [WD_DURATION]: [
            {
              amount: durationInSeconds,
              unit: WDQ_SECOND,
            },
          ],
          [WD_PUBLICATION_DATE]: [
            {
              value: publishedDate,
            },
          ],
          [WD_TITLE]: [{ text: wikidataLabel, language }],
          [WD_YOUTUBE_CHANNEL_ID]: [{ value: video.snippet.channelId }],
        },
      },
    ],
    [WD_NUMBER_OF_LIKES]: [
      { value: video.statistics.likeCount, qualifiers: statisticsQualifier },
    ],
    [WD_NUMBER_OF_COMMENTS]: [
      { value: video.statistics.commentCount, qualifiers: statisticsQualifier },
    ],
    [WD_NUMBER_OF_VIEWERS_LISTENERS]: [
      { value: video.statistics.viewCount, qualifiers: statisticsQualifier },
    ],
    [WD_COPYRIGHT_LICENSE]: [
      {
        value: license,
      },
    ],
  };

  let recordedDate = extractRecordingDate(video.snippet.description);
  if (recordedDate) {
    claims[WD_RECORDING_DATE] = [
      {
        time: recordedDate.value,
        references: {
          [WD_BASED_ON_HEURISTIC]: WDQ_INFERRED_FROM_YOUTUBE_DESCRIPTION,
          [WD_STATED_IN_REFERENCE_AS]: recordedDate.statedAs,
        },
      },
    ];
  }
  let hasQuality = [];
  if (video.status.madeForKids) {
    hasQuality.push(WDQ_YOUTUBE_MADE_FOR_KIDS);
  }

  return {
    type: "item",
    labels,
    descriptions,
    aliases,
    claims,
    sitelinks: [],
  };
}
