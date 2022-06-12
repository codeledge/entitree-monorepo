import {
  WDQ_PODCAST,
  WDQ_PODCAST_EPISODE,
  WD_APPLE_PODCASTS_PODCAST_EPISODE_ID,
  WD_APPLE_PODCASTS_PODCAST_ID,
  WD_DURATION,
  WD_END_TIME,
  WD_FULL_WORK_AVAILABLE_AT_URL,
  WD_INCEPTION,
  WD_PART_OF_THE_SERIES,
  WD_PRODUCTION_CODE,
  WD_PUBLICATION_DATE,
  WD_RECORDING_DATE,
  WD_SPOTIFY_SHOW_EPISODE_ID,
  WD_SPOTIFY_SHOW_ID,
  WD_START_TIME,
  WD_TALK_SHOW_GUEST,
  WD_TITLE,
  WD_YOUTUBE_VIDEO_ID,
} from "@entitree/helper";
import { Column, Page } from "../types";

export const publicationProps: Column[] = [
  {
    property: WD_PUBLICATION_DATE,
  },
];

export const podcasts: Page = {
  represents: WDQ_PODCAST,
  category: "podcast",
  header: [
    { property: "label" },
    { property: WD_INCEPTION, type: "integer", options: { date: "year" } },
    { property: WD_START_TIME },
    { property: WD_END_TIME },
    { name: "P136" },
    { name: "P449" },
    { name: "P17" },
    { name: "P371" },
    { name: "P407" },
    { property: WD_APPLE_PODCASTS_PODCAST_ID, visible: false },
    { property: WD_SPOTIFY_SHOW_ID, visible: false },
  ],
  dataset: [],
};

export const podcast_episodes: Page = {
  represents: WDQ_PODCAST_EPISODE,
  category: "podcast",
  refine: WD_PART_OF_THE_SERIES,
  header: [
    ...publicationProps,
    { property: WD_PART_OF_THE_SERIES, visible: false },
    { property: WD_RECORDING_DATE },
    { property: WD_TITLE },
    { property: WD_DURATION },
    { property: WD_PRODUCTION_CODE },
    { property: WD_TALK_SHOW_GUEST },
    { property: WD_FULL_WORK_AVAILABLE_AT_URL, visible: false },
    { property: WD_APPLE_PODCASTS_PODCAST_EPISODE_ID, visible: false },
    { property: WD_SPOTIFY_SHOW_EPISODE_ID, visible: false },
    { property: WD_YOUTUBE_VIDEO_ID, visible: false },
  ],
};
