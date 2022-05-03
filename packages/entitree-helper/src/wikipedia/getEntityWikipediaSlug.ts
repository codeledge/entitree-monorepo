import { DataSource, getWikibaseInstance } from "../wikidata";

import { LangCode } from "../types";
import axios from "axios";

export default async function getEntityWikipediaSlug(
  id: string,
  langCode: LangCode,
  dataSource: DataSource
) {
  const wikibaseInstance = getWikibaseInstance(dataSource);

  const url = wikibaseInstance.getEntities({
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
