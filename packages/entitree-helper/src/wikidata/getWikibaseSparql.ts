import axios from "axios";
import { Wbk } from "wikibase-sdk/dist/types/wbk";
import wdk from "wikibase-sdk/dist/wellknown/wikidata.org";

export async function getWikibaseSparql(query: string, wbk: Wbk = wdk) {
  const [url, body] = wbk.sparqlQuery(query).split("?", 2);
  return axios
    .post(url, body)
    .then((res) => wbk.simplify.sparqlResults(res.data))
    .then((results) => {
      return results;
    });
}

export async function getWikidataSparql(query: string) {
  return await getWikibaseSparql(query);
}
