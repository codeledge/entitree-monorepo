import axios from 'axios';
import wdk from 'wikidata-sdk';

export async function getSparql(query: string) {
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
