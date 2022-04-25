//@ts-nocheck
import wdk from "wikidata-sdk";
import axios from "axios";

export default async function getWikibaseSourceIds(
  entityId: string,
  propId: string,
  dataSource?: string
): Promise<string[]> {
  const wikibaseInstance = wdk;

  const url = wikibaseInstance.getReverseClaims(propId, entityId);
  const { data } = await axios.get(url);

  //TODO: get ids directly without simplify
  const ids = wikibaseInstance.simplify
    .sparqlResults(data)
    .map(({ subject }) => subject);

  return ids;
}
