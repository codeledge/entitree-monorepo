import { EntityId, Props, WmLanguageCode } from "wikibase-sdk";
import { getWikibaseEntities } from "./getWikibaseEntities";
import { wdk } from "./getWikibaseInstance";

export async function getWikidataEntities(
  ids: EntityId[],
  languages: WmLanguageCode[] = ["en"],
  props: Props[] = ["labels", "descriptions", "claims", "sitelinks/urls"]
) {
  return await getWikibaseEntities({
    ids,
    languages,
    props,
  });
}

export async function getSimplifiedWikidataEntities(
  ids: EntityId[],
  languages: WmLanguageCode[] = ["en"],
  props: Props[] = ["labels", "descriptions", "claims", "sitelinks/urls"]
) {
  const entities = await getWikidataEntities(ids, languages, props);

  return wdk.simplify.entities(entities as any, {
    keepQualifiers: true,
    addUrl: true,
  });
}
