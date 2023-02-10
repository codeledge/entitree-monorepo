import axios from "axios";
import { Wbk } from "wikibase-sdk/dist/types/wbk";
import wdk from "wikibase-sdk/dist/wellknown/wikidata.org";

export async function getWikibaseSourceIds(
  entityId: string,
  propId: string,
  wbk: Wbk = wdk
): Promise<string[]> {
  const url = wbk.getReverseClaims({
    properties: propId,
    values: entityId, //TODO check if correct
  });
  const { data } = await axios.get(url);

  //TODO: get ids directly without simplify
  const ids = wbk.simplify
    .sparqlResults(data)
    .map(({ subject }: { subject: any }) => subject);

  return ids;
}
