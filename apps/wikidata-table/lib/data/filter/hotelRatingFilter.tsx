import { WD_HOTEL_RATING } from "@entitree/helper";
import { AutocompleteInput } from "react-admin";
import { countryFilter } from "./country";

/*
#hotel ratings
SELECT ?item ?itemLabel ?short
WHERE 
{
  ?item wdt:P31 wd:Q110772636.
  ?item wdt:P1813 ?short
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}
ORDER BY ?short
*/

const ratings = [
  {
    item: "http://www.wikidata.org/entity/Q110772650",
    itemLabel: "1-star hotel rating",
    short: "1*",
  },
  {
    item: "http://www.wikidata.org/entity/Q110772651",
    itemLabel: "2-star hotel rating",
    short: "2*",
  },
  {
    item: "http://www.wikidata.org/entity/Q110772652",
    itemLabel: "3-star hotel rating",
    short: "3*",
  },
  {
    item: "http://www.wikidata.org/entity/Q110772653",
    itemLabel: "4-star hotel rating",
    short: "4*",
  },
  {
    item: "http://www.wikidata.org/entity/Q109248725",
    itemLabel: "5-star hotel rating",
    short: "5*",
  },
  {
    item: "http://www.wikidata.org/entity/Q110772654",
    itemLabel: "6-star hotel rating",
    short: "6*",
  },
  {
    item: "http://www.wikidata.org/entity/Q110772655",
    itemLabel: "7-star hotel rating",
    short: "7*",
  },
];

export const hotelRatingFilter = [
  countryFilter,
  <AutocompleteInput
    key={WD_HOTEL_RATING}
    source={WD_HOTEL_RATING}
    label="hotel rating"
    choices={ratings.map((d) => ({
      id: d.item.split("entity/")[1],
      name: d.itemLabel,
    }))}
    alwaysOn
  />,
];
