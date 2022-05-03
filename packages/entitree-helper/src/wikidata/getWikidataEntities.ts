import { getWikibaseEntities, getWikidataInstance } from ".";

export async function getWikidataEntities(
  ids: string[],
  languages = ["en"],
  props = ["labels", "descriptions", "claims", "sitelinks/urls"]
) {
  return await getWikibaseEntities({
    ids,
    languages,
    props,
    dataSource: "wikidata",
  });
}

export async function getSimplifiedWikidataEntities(
  ids: string[],
  languages = ["en"],
  props = ["labels", "descriptions", "claims", "sitelinks/urls"]
) {
  const entities = await getWikidataEntities(ids, languages, props);
  return getWikidataInstance().simplify.entities(entities, {
    keepQualifiers: true,
    addUrl: true,
  });
}
