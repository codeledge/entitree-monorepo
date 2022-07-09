import {
  WDQ_HUMAN,
  WD_DATE_OF_BIRTH,
  WD_DATE_OF_DEATH,
  WD_INDONESIAN_PARLIAMENT_CANDIDATE_ID_2019,
  WD_NUMBER_OF_CHILDREN,
  WD_OCCUPATION,
  WD_PLACE_OF_BIRTH,
  WD_RELIGION,
} from "@entitree/helper";
import { Column, Page } from "../types";
import { politiciansFilter } from "./politicsFilter";

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
    property: WD_NUMBER_OF_CHILDREN,
  },
  {
    property: WD_RELIGION,
  },
];

export const politicians: Page = {
  represents: WDQ_HUMAN,
  category: "politics",
  filter: {
    [WD_OCCUPATION]: "Q82955",
  },
  filterButtons: politiciansFilter,
  header: [
    ...humanProps,
    { property: WD_INDONESIAN_PARLIAMENT_CANDIDATE_ID_2019, visible: false },
  ],
  dataset: [],
};
