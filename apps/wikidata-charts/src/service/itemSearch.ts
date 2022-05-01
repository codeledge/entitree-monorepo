import { WikidataSearchResult, wikidataSearchEntities } from "@entitree/helper";

import { IndicatorInfo } from "../sparql/queries";
//@ts-ignore
import wbk from "wikidata-sdk";

type PROPERTY = {
  item: {
    value: string;
    label: string;
    description: string;
  };
  amount: number;
};

export async function itemSearch(
  term: string,
  indicator?: IndicatorInfo
): Promise<WikidataSearchResult[]> {
  if (indicator && indicator.time == "time") {
    console.log(indicator);
    try {
      const widget = await import(
        "../sparql/properties/res/" + indicator.props.p + ".json"
      ).then((module) => module.default);
      const possibleResults = widget.map((x: PROPERTY) => {
        return {
          label: x.item.label,
          id: x.item.value,
          description: x.item.description,
          url: wbk.getSitelinkUrl({ site: "wikidata", title: x.item.value }),
        };
      });
      if (!term || term.length == 0) {
        return possibleResults;
      }
      const ret = possibleResults.filter((element: any) =>
        element.label.toLowerCase().includes(term.toLowerCase())
      );
      if (ret.length > 0) {
        return ret;
      }
    } catch (e) {
      console.log(e);
    }
  }
  if (term.length < 3) {
    return [];
  }

  const items = await wikidataSearchEntities(term, "en");
  return items;
}
