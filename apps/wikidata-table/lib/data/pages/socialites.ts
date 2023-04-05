import {
  WDQ_HUMAN,
  WD_AFFILIATION_STRING,
  WD_COUNTRY_OF_CITIZENSHIP,
  WD_DATE_OF_BIRTH,
  WD_DATE_OF_DEATH,
  WD_OCCUPATION,
  WD_PLACE_OF_BIRTH,
  WD_RELIGION,
  WD_WORLD_ECONOMIC_FORUM_ID,
} from "@entitree/helper";
import { Column, Page } from "../types";
import { eventFilter } from "../filter/eventFilter";

export const humanProps: Column[] = [
  {
    property: WD_DATE_OF_BIRTH,
  },
  {
    property: WD_DATE_OF_DEATH,
  },
  {
    property: WD_PLACE_OF_BIRTH,
  },
  {
    property: WD_OCCUPATION,
  },
  {
    property: WD_COUNTRY_OF_CITIZENSHIP,
  },
  {
    property: WD_AFFILIATION_STRING,
  },
  {
    property: WD_RELIGION,
  },
];

export const forumAttendes: Page = {
  represents: WDQ_HUMAN,
  category: "politics",
  filter: {
    [WD_OCCUPATION]: "Q115088092",
  },
  filterButtons: eventFilter,
  header: [...humanProps, { property: WD_WORLD_ECONOMIC_FORUM_ID }],
  dataset: [],
};
