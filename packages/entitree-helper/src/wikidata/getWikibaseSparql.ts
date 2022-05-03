import { DataSource, getWikibaseInstance } from "./getWikibaseInstance";

import axios from "axios";

export async function getWikibaseSparql(query: string, dataSource: DataSource) {
  const wikibaseInstance = getWikibaseInstance(dataSource);

  const url = await new Promise<string>((resolve, reject) => {
    try {
      const url = wikibaseInstance.sparqlQuery(query);
      resolve(url);
    } catch (error) {
      reject(error);
    }
  });
  return axios
    .get(url)
    .then(({ data }) => wikibaseInstance.simplify.sparqlResults(data))
    .then((results) => {
      return results;
    });
  // .catch(errorHandler);
}

export async function getWikidataSparql(query: string) {
  return await getWikibaseSparql(query, "wikidata");
}
