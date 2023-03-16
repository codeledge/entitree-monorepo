import axios from "axios";
import { Wbk } from "wikibase-sdk";
import { wdk } from "./getWikibaseInstance";

export async function getWikibaseSparql(query: string, wbk: Wbk = wdk) {
  const [url, body] = wbk.sparqlQuery(query).split("?", 2);
  return axios
    .post(url, body)
    .then((res) => wbk.simplify.sparqlResults(res.data))
    .then((results) => {
      return results;
    });
}

export async function getWikidataSparql(query: string): Promise<any> {
  return await getWikibaseSparql(query);
}
