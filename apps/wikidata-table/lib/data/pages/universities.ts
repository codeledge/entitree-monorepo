import {
  WD_LOCATED_IN_THE_ADMINISTRATIVE_TERRITORIAL_ENTITY,
  WD_COUNTRY,
  WD_INCEPTION,
} from "@entitree/helper";
import { Page } from "../types";

export const universities: Page = {
  represents: "Q38723",
  example:
    '\n //ranked institions which are not higher educational institutions\n SELECT DISTINCT ?item ?itemLabel WHERE {\n {?item wdt:P5586 ?in} UNION {?item wdt:P5584 ?in} UNION {?item wdt:P5600 ?in} UNION {?item wdt:P5600 ?in}\n SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }\n FILTER(NOT EXISTS { ?item (wdt:P31/wdt:P279*) wd:Q38723. })\n}\n\n//exclude end date in P31\n?item p:P31 ?xx .\n FILTER NOT EXISTS { ?xx pq:P582 ?x }\n',
  list: "Q1846117",
  img: "universities.png",
  category: "education",
  query:
    "SELECT DISTINCT ?item WHERE {\n ?item (wdt:P31/wdt:P279*) wd:Q38723 . \n FILTER(NOT EXISTS { ?item wdt:P576 ?yearEnd. })\n FILTER(NOT EXISTS { ?item wdt:P582 ?yearEnd2. })\n}",
  // query_ranks:
  //   "SELECT DISTINCT ?item WHERE {\n ?item wdt:P31/wdt:P279* wd:Q2385804.\n {?item wdt:P5586 ?in} UNION {?item wdt:P5584 ?in} UNION {?item wdt:P5600 ?in} UNION {?item wdt:P5600 ?in}\n}",
  // orderby: "Q478743",
  header: [
    { name: "Q82799", property: "label", url: "item" },
    {
      property: WD_LOCATED_IN_THE_ADMINISTRATIVE_TERRITORIAL_ENTITY,
      visible: false,
    },
    { property: WD_COUNTRY, valueconstraint: { P576: false } },
    { property: WD_INCEPTION, options: { date: "year" } },
    // { property: "google_maps_rating" },
    // {
    //   name: "Q1068155",
    //   width: "30px",
    //   property: "female_male_ratio",
    //   type: "float",
    //   options: { round: 2, take: 1 },
    // },
    // {
    //   property: "P2196",
    //   type: "integer",
    //   render: '(row["P2196_P585"] ? data+" ("+row["P2196_P585"]+")" : data)',
    //   options: {
    //     getqualifiers: { P585: "integer" },
    //     sort: 1,
    //     last: true,
    //     qualifiers: { P518: false },
    //   },
    // },
    // { name: "Q3595370", type: "float", property: "student_staff_ratio" },
    // {
    //   name: "Q478743",
    //   property: "shanghai_rank",
    //   sort: "int",
    //   options: { sort: "rank" },
    // },
    // {
    //   name: "Q1318318",
    //   property: "times_rank",
    //   sort: "int",
    //   options: { sort: "rank" },
    // },
    // {
    //   name: "Q1790510",
    //   property: "qs_rank",
    //   sort: "int",
    //   options: { sort: "rank" },
    // },
    { property: "P5894", visible: false },
    { name: "P5822", type: "float", options: { round: 3 }, visible: false },
    {
      property: "international_academic_staff",
      type: "float",
      visible: false,
      width: "45px",
      options: { round: 0 },
    },
    { property: "citation_rate", visible: false, options: { round: 0 } },
    {
      property: "foreign_lang_bachelor_programmes",
      visible: false,
      options: { round: 0 },
    },
    {
      property: "foreign_lang_master_programmes",
      visible: false,
      options: { round: 0 },
    },
    {
      property: "ontime_graduation_bachelor",
      type: "float",
      visible: false,
      options: { round: 2 },
    },
    {
      property: "ontime_graduation_master",
      type: "float",
      visible: false,
      options: { round: 2 },
    },
    {
      property: "bachelor_graduation_rate",
      type: "float",
      visible: false,
      options: { round: 2 },
    },
    {
      property: "masters_graduation_rate",
      type: "float",
      visible: false,
      options: { round: 2 },
    },
    {
      property: "wikidata_count_educated",
      type: "integer",
      visible: false,
    },
    { name: "P1329", visible: false },
  ],
  dataset: [
    "collegescorecard",
    "educated_at",
    "timesranking",
    "qsranking",
    "shanghairanking",
    "umultirank",
    "google_maps_cid",
  ],
};
