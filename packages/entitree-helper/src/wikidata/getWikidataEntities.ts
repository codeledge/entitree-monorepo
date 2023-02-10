import { getWikibaseEntities } from "./getWikibaseEntities";
import { wdk } from "./getWikibaseInstance";
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
  });
}

export async function getSimplifiedWikidataEntities(
  ids: string[],
  languages = ["en"],
  props = ["labels", "descriptions", "claims", "sitelinks/urls"]
) {
  const entities = await getWikidataEntities(ids, languages, props);
  //@ts-ignore //TODO wait for next version
  return wdk.simplify.entities(entities, {
    keepQualifiers: true,
    addUrl: true,
  });
}
