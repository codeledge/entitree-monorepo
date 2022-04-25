import axios from "axios";

export type WikidataSearchResult = {
  aliases?: string[]; // ["Queen Elizabeth II"]
  id: string; // Q623
  description?: string; // "chemical element with symbol C and atomic number 6; common element of all known life"
  concepturi: string; // "http://www.wikidata.org/entity/Q623"
  label: string; // carbon
  match: {
    language: string; // en
    text: string; // carbon
    type: string; // label
  };
  pageid: number; // 908
  repository: string; // wikidata
  title: string; // Q623
  url: string; // www.wikidata.org/wiki/Q623
};

type WikidataSearchResponse = {
  search: WikidataSearchResult[];
  "search-continue": number;
  searchinfo: { search: string };
  success: number;
  error?: {
    code: string;
    info: string;
    "*": string;
  };
  servedby: string;
};

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
