import { DataSource, getWikibaseInstance } from "./getWikibaseInstance";

import axios from "axios";

export async function getWikibaseSparql(query: string, dataSource: DataSource) {
  const wikibaseInstance = getWikibaseInstance(dataSource);
  const [url, body] = wikibaseInstance.sparqlQuery(query).split("?", 2);
  return axios
    .post(url, body)
    .then((res) => wikibaseInstance.simplify.sparqlResults(res.data))
    .then((results) => {
      return results;
    });
}

export async function getWikidataSparql(query: string) {
  return await getWikibaseSparql(query, "wikidata");
}
