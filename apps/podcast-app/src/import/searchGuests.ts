import axios from "axios";
import { getWikidataSparql } from "@entitree/helper";
//@ts-ignore
import wdk from "wikidata-sdk";

export async function searchGuest(search: string): Promise<null | string> {
  const url = wdk.searchEntities({
    search,
    limit: 10,
  });
  const searchResults = (await axios.get(url)).data;
  const searchIds = searchResults.search.map((result: any) => result.id);
  console.log(searchIds);
  if (searchIds.length === 0) {
    return null;
  }

  //just take the first one if only one TODO disable
  if (searchIds.length === 1) {
    return searchIds[0];
  }
  // try {
  const query = `
    SELECT DISTINCT ?item ?itemLabel
      WHERE 
      {
        VALUES ?item {wd:${searchIds.join(" wd:")}}
        ?item wdt:P31 wd:Q5.
        ?any wdt:P5030 ?item.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }`;
  const data = await getWikidataSparql(query);
  if (data.length === 0) {
    return null;
  }
  if (data.length > 1) {
    console.log("found more than 1 guest match", data);
  }
  return data[0].item.value;
  // } catch (er) {
  //   throw new Error("couldn't get episodes");
  // }
  // return searchResults;
}
