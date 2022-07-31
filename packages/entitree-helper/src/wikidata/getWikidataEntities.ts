import { getWikibaseEntities, getWikidataInstance } from ".";
import { WikidataEntity } from "./types/Entity";
type WikidataEntityMap = Record<WikidataEntity["id"], WikidataEntity>;

export async function getWikidataEntities(
  ids: string[],
  languages = ["en"],
  props = ["labels", "descriptions", "claims", "sitelinks/urls"]
): Promise<WikidataEntityMap> {
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
