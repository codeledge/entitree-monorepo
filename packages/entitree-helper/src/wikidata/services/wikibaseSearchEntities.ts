import axios from "axios";
import { SearchResponse, SearchResult } from "wikibase-sdk";

export type WikidataSearchResult = SearchResult;

type WikidataSearchResponse = SearchResponse;

export const wikidataSearchEntities = async (
  term: string,
  languageCode: string
) => {
  return await wikibaseSearchEntities(
    term,
    languageCode,
    "https://www.wikidata.org"
  );
};

export const wikibaseSearchEntities = async (
  term: string,
  languageCode: string,
  baseURL: string
) => {
  const wikibaseService = axios.create({
    baseURL,
  });
  wikibaseService.interceptors.response.use((res) => res.data);

  const { search, error } = await wikibaseService.get<
    any,
    WikidataSearchResponse
  >("/w/api.php", {
    params: {
      origin: "*",
      action: "wbsearchentities",
      format: "json",
      uselang: languageCode,
      language: languageCode,
      search: term,
    },
  });
  if (error) throw error;

  return search;
};
