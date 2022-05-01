import {
  WDQ_PODCAST_EPISODE,
  WD_CAST_MEMBER,
  WD_COUNTRY,
  WD_COUNTRY_OF_ORIGIN,
  WD_PART_OF_THE_SERIES,
  WD_POINT_IN_TIME,
  WD_POLITICAL_IDEOLOGY,
  WD_PUBLICATION_DATE,
  WD_SEX_OR_GENDER,
  WD_START_TIME,
  WD_TALK_SHOW_GUEST,
  WD_UNMARRIED_PARTNER,
} from "@entitree/helper";

import { quantityProps } from "./properties/quantity";
import { superQueries } from "./superQueries";

type PROP_TYPE = {
  [key: string]: string;
};

// type PROP_TYPE: PROP_TYPE_TYPE = {
//   s?: string;
//   // p?: string;
//   i?: string;
//   d?: string;
// };
export const INDICATOR_GROUPS = [
  "statistics",
  "politics",
  "media",
  "science",
  "television",
  "podcast",
  "economy",
];
export type IndicatorInfo = {
  group: string;
  code: string;
  name: string;
  query: string;
  props: PROP_TYPE;
  time?: string;
  description?: string;
  fullQuery?: string;
  error?: string; //for debugging

  // indicator_name: string;
  // short_definition: string | null;
  // long_definition: string;
  // statistical_concept_and_methodology: string;
  // development_relevance: string;
  // snippet: string;
  // error?: true;
};
type SparqlValue = {
  value: string;
  label: string;
};
export type SparqlResult = {
  search?: SparqlValue;
  [key: string]: any;
};

export const COLOR_QUERY = `SELECT ?item ?itemLabel ?color ?hex WHERE {
  VALUES ?item {wd:$1}
    { ?item wdt:P465 ?hex. } 
  UNION {
    ?item wdt:P163 ?flag.
    ?flag p:P462 ?color.
    ?color pq:P465 ?hex.
    }
}`;

let newIdea = [
  {
    name: "podcast episodes",
    item: WDQ_PODCAST_EPISODE,
    analysis: [
      {
        name: "episode",
        props: [WD_PUBLICATION_DATE, WD_TALK_SHOW_GUEST],
      },
    ],
  },
];
let queries: IndicatorInfo[] = [
  {
    code: "AGE_BY_PARLIAMENT",
    name: "Parliament age distribution by term",
    props: {
      query:
        "?item p:P39 ?position. ?position pq:P2937 ?search. #parliamentiary term",
      s: "P3602",
      eventDate: WD_START_TIME,
    },
    time: "age",
    query: superQueries.ageByEvent,
    group: "politics",
  },
  {
    code: "AGE_BY_ELECTION",
    name: "Candidate Age by election",
    props: {
      query: "?item wdt:$s ?search.",
      s: "P3602",
      eventDate: WD_POINT_IN_TIME,
    },
    time: "age",
    query: superQueries.ageByEvent,
    group: "politics",
  },
  {
    code: "EMPLOYEE_INMATE_RATIO",
    name: "Staff inmate ratio by prison by month",
    description:
      "The number of employees per prisoner, only datapoints for coexising data (both employee & prisoner count)",
    props: {
      // query: "?item wdt:$s ?search.",
      // s: "P3602",
      // eventDate: POINT_IN_TIME,
    },
    time: "time",
    group: "statistics",
    query: superQueries.ratio,
  },
  {
    code: "PARTNERS_AGE",
    name: "Partners age",
    props: {
      p: WD_UNMARRIED_PARTNER,
      // query: "?item wdt:$s ?search.",
      // s: "P3602",
      // eventDate: POINT_IN_TIME,
    },
    time: "partner_age",
    query: superQueries.partnersAge,
    group: "media",
  },
  {
    code: "PARTY_BY_ELECTION_CAT",
    name: "Candidate parties by elections",
    props: {
      // query: "?item wdt:$s ?search.",
      // s: "P3602",
      // eventDate: POINT_IN_TIME,
    },
    time: "year",
    query: superQueries.partyByElection,
    group: "politics",
  },
  {
    code: "TV_EPISODES_YEARLY",
    name: "TV episodes published by year",
    props: {
      s: WD_PART_OF_THE_SERIES,
      d: WD_PUBLICATION_DATE,
      i: "Q2431196", //TV episode Q21191270
    },
    time: "year",
    query: superQueries.byYear,
    group: "media",
  },
  {
    code: "PODCAST_YEARLY",
    name: "podcast episodes published by year",
    props: {
      s: WD_PART_OF_THE_SERIES,
      d: WD_PUBLICATION_DATE,
      i: WDQ_PODCAST_EPISODE,
    },
    time: "year",
    query: superQueries.byYear,
    group: "podcast",
  },
  {
    code: "PODCAST_MONTH",
    name: "podcast episodes published by month",
    props: {
      s: WD_PART_OF_THE_SERIES,
      d: WD_PUBLICATION_DATE,
      i: WDQ_PODCAST_EPISODE,
    },
    time: "month",
    query: superQueries.byMonth,
    group: "podcast",
  },
  {
    code: "EPISODES_FEMALE_GUEST_PROP",
    name: "podcast episodes female guest proportion",
    props: {
      s: WD_PART_OF_THE_SERIES,
      d: WD_PUBLICATION_DATE,
      i: WDQ_PODCAST_EPISODE,
      p: "P21",
    },
    time: "female",
    query: superQueries.byCharacteristic,
    group: "podcast",
  },
  {
    code: "EPISODES_OCCU_GUEST_PROP",
    name: "podcast episodes guests occupation",
    props: {
      s: WD_PART_OF_THE_SERIES,
      d: WD_PUBLICATION_DATE,
      i: WDQ_PODCAST_EPISODE,
      p: "P106",
    },
    time: "bar",
    query: superQueries.byCharacteristic,
    group: "podcast",
  },
  {
    code: "EPISODES_POLITICAL_GUEST_PROP",
    name: "podcast episodes guests political",
    props: {
      s: WD_PART_OF_THE_SERIES,
      d: WD_PUBLICATION_DATE,
      i: WDQ_PODCAST_EPISODE,
      p: WD_POLITICAL_IDEOLOGY,
    },
    time: "bar",
    query: superQueries.byCharacteristic,
    group: "podcast",
  },
  {
    code: "EPISODES_GENDER_GUEST_PROP",
    name: "podcast episodes guests gender",
    props: {
      s: WD_PART_OF_THE_SERIES,
      d: WD_PUBLICATION_DATE,
      i: WDQ_PODCAST_EPISODE,
      p: WD_SEX_OR_GENDER,
    },
    time: "bar",
    query: superQueries.byCharacteristic,
    group: "podcast",
  },
  {
    code: "EPISODES_CITIZEN_GUEST_PROP",
    name: "podcast episodes guests citizenship",
    props: {
      s: WD_PART_OF_THE_SERIES,
      d: WD_PUBLICATION_DATE,
      i: WDQ_PODCAST_EPISODE,
      p: "P27",
    },
    time: "bar",
    query: superQueries.byCharacteristic,
    group: "podcast",
  },
  {
    code: "PODCAST_EPISODES_AVERAGE_AGE",
    name: "podcast episodes guests average age",
    props: {
      s: WD_PART_OF_THE_SERIES,
      d: WD_PUBLICATION_DATE,
      i: WDQ_PODCAST_EPISODE,
      p: WD_TALK_SHOW_GUEST,
    },
    time: "year",
    query: superQueries.avgAge,
    group: "podcast",
  },
  {
    code: "podcast episodes average duration",
    name: "podcast episodes average duration",
    props: {
      s: WD_PART_OF_THE_SERIES,
      d: WD_PUBLICATION_DATE,
      i: WDQ_PODCAST_EPISODE,
    },
    time: "year",
    query: superQueries.avgDuration,
    group: "podcast",
  },
  {
    code: "TV_EPISODES_AVERAGE_AGE",
    name: "TV episodes guests average age",
    props: {
      s: WD_PART_OF_THE_SERIES,
      i: "Q2431196", //audiovisual work
      d: WD_PUBLICATION_DATE,
      p: WD_CAST_MEMBER,
    },
    time: "year",
    query: superQueries.avgAge,
    group: "television",
  },
  {
    code: "BOOKS_YEARLY",
    name: "books published by year by author",
    props: {
      s: "P50",
      d: WD_PUBLICATION_DATE,
      i: "Q7725634", //literary work
    },
    time: "year",
    query: superQueries.byYear,
    group: "media",
  },
  {
    code: "scholarly article",
    name: "scholarly article by year by author",
    props: {
      s: "P50",
      d: WD_PUBLICATION_DATE,
      i: "Q13442814", //scholarly article
    },
    time: "year",
    query: superQueries.byYear,
    group: "media",
  },
  {
    code: "MOVIES_YEARLY",
    name: "movies played in by year by actor",
    props: {
      s: "P161",
      d: WD_PUBLICATION_DATE,
      i: "Q11424", //film/movie
    },
    query: superQueries.byYear,
    group: "media",
  },
  {
    code: "EARTHQUAKE_YEARLY",
    name: "earthquakes by country",
    props: {
      s: "P17", //country
      i: "Q7944", //earthquake
      d: WD_POINT_IN_TIME,
    },
    time: "year",
    group: "science",
    query: superQueries.byYear,
  },
  {
    code: "FLOODS_YEARLY",
    name: "floods by country",
    props: {
      s: WD_COUNTRY, //country
      i: "Q8068", //flood
      d: WD_POINT_IN_TIME,
    },
    time: "year",
    group: "science",
    query: superQueries.byYear,
  },
  {
    code: "MOVIES_YEARLY_COUNTRY",
    name: "movies published by origin country",
    props: {
      s: WD_COUNTRY_OF_ORIGIN, //country of origin
      i: "Q11424", //film
      d: WD_PUBLICATION_DATE,
    },
    time: "year",
    query: superQueries.byYear,
    group: "media",
  },
];

const QUANTITY_PROPS = quantityProps;
for (let i = 0; i < QUANTITY_PROPS.length; i++) {
  const prop = QUANTITY_PROPS[i];
  const propId = prop.item.split("entity/")[1];
  queries.push({
    code: propId,
    name: prop.itemLabel,
    description: prop.itemDescription,
    props: {
      d: WD_POINT_IN_TIME,
      p: propId,
    },
    time: "time",
    group: "statistics",
    query: superQueries.valueByItem,
  });
}

export { queries };
