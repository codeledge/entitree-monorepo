import {
  WD_LOCATED_IN_THE_ADMINISTRATIVE_TERRITORIAL_ENTITY,
  WD_OWNED_BY,
} from "@entitree/helper";
import { socialBusiness } from "../addition";
import { Page } from "../types";

export const pharmaceutical_companies: Page = {
  represents: "Q19644607",
  query:
    'SELECT DISTINCT ?item ?itemLabel\nWHERE\n{\n ?item wdt:P31 wd:Q19644607\n SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }\n}',
  list: "Q2087302",
  category: "medicine",
  header: [
    { name: "label" },
    { name: "P571" },
    { name: "P17" },
    { name: "trustpilot_score", type: "stars", render: "stars(data,0,10)" },
    { name: "trustpilot_reviews", visible: false },
  ],
};

export const hospitals: Page = {
  represents: "Q16917",
  category: "medicine",
  header: [
    { name: "P17" },
    { property: WD_LOCATED_IN_THE_ADMINISTRATIVE_TERRITORIAL_ENTITY },
    { property: WD_OWNED_BY },
    ...socialBusiness,
  ],
};
