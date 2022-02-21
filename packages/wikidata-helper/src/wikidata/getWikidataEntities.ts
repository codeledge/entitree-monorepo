//@ts-ignore
import wdk from "wikidata-sdk";
import getWikibaseEntities from "./getWikibaseEntities";

export async function getWikidataEntities(
  ids: string[],
  languages = ["en"],
  props = ["labels", "descriptions", "claims", "sitelinks/urls"]
) {
  return await getWikibaseEntities({ ids, languages, props, dataSource: wdk });
}
