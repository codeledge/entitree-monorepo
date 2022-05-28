import { DataSource, getWikibaseInstance } from "./getWikibaseInstance";

import axios from "axios";

export async function getWikibaseSourceIds(
  entityId: string,
  propId: string,
  dataSource: DataSource
): Promise<string[]> {
  const wikibaseInstance = getWikibaseInstance(dataSource);

  const url = wikibaseInstance.getReverseClaims(propId, entityId);
  const { data } = await axios.get(url);

  //TODO: get ids directly without simplify
  const ids = wikibaseInstance.simplify
    .sparqlResults(data)
    .map(({ subject }: { subject: any }) => subject);

  return ids;
}
