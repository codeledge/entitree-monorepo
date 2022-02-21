import axios from "axios";
//@ts-ignore
import wdk from "wikidata-sdk";

export async function getWikidataSparql(query: string) {
  const url = await new Promise<string>((resolve, reject) => {
    try {
      const url = wdk.sparqlQuery(query);
      resolve(url);
    } catch (error) {
      reject(error);
    }
  });
  return axios
    .get(url)
    .then(({ data }) => wdk.simplify.sparqlResults(data))
    .then((results) => {
      return results;
    });
  // .catch(errorHandler);
}
