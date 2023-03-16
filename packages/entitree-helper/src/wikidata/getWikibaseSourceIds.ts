import axios from "axios";
import { PropertyId, Wbk } from "wikibase-sdk";
import { wdk } from "./getWikibaseInstance";

export async function getWikibaseSourceIds(
  entityId: string,
  propId: PropertyId,
  wbk: Wbk = wdk
): Promise<string[]> {
  const url = wbk.getReverseClaims({
    properties: propId,
    values: entityId, //TODO check if correct
  });
  const { data } = await axios.get(url);

  //TODO: get ids directly without simplify
  const ids = (wbk as any).simplify
    .sparqlResults(data)
    .map(({ subject }: { subject: any }) => subject);

  return ids;
}
