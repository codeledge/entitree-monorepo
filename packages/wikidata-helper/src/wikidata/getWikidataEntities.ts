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

export async function getSimplifiedWikidataEntities(
  ids: string[],
  languages = ["en"],
  props = ["labels", "descriptions", "claims", "sitelinks/urls"]
) {
  const entities = await getWikidataEntities(ids, languages, props);
  return wdk.simplify.entities(entities, {
    keepQualifiers: true,
    addUrl: true,
  });
}
