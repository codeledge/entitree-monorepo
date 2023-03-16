import { wdk } from "../wikidata";
import axios from "axios";
import { EntityId, Wbk, WmLanguageCode } from "wikibase-sdk";

export async function getEntityWikipediaSlug(
  id: EntityId,
  langCode: WmLanguageCode,
  wbk: Wbk = wdk
) {
  const url = wbk.getEntities({
    ids: [id],
    languages: [langCode],
    props: ["sitelinks/urls"],
  });

  const {
    data: { entities },
  } = await axios.get(url);

  const wikipediaSlug =
    entities[id]?.sitelinks?.[langCode + "wiki"]?.url?.split("/wiki/")[1];

  return wikipediaSlug;
}
