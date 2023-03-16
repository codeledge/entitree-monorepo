import { LangCode } from "../types/Lang";
import axios from "axios";
import { wdk } from "./getWikibaseInstance";

export async function getEntityIdFromSlug(
  slug: string,
  langCode: LangCode
): Promise<string> {
  //TODO: why is this a promise?
  const url = await new Promise<string>((resolve, reject) => {
    try {
      const query = `
      SELECT ?item WHERE {
        ?sitelink schema:about ?item;
        schema:isPartOf <https://${langCode}.wikipedia.org/>;
        schema:name "${slug.replace(/_/g, " ")}"@${langCode}.
      }`.trim();

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
      return (results as any)?.[0]?.item;
    });
  // .catch(errorHandler);
}
