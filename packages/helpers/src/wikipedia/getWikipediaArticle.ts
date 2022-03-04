import axios from "axios";

type Response = {
  type: string;
  title: string;
  displaytitle: string;
  namespace: { id: number; text: string }; //No idea
  wikibase_item: string; //'Q165709'
  titles: {
    canonical: string; //this is the slug e.g. Princess_Eugenie
    normalized: string;
    display: string;
  };
  pageid: number;
  thumbnail: {
    source: string;
    width: number;
    height: number;
  };
  originalimage: {
    source: string;
    width: number;
    height: number;
  };
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description: string;
  description_source: string;
  content_urls: { desktop: unknown; mobile: unknown };
  extract: string;
  extract_html: string;
};

export async function getWikipediaArticle(
  wikipediaSlug: string,
  langCode: string = "en"
) {
  const { data } = await axios.get<Response>(
    `https://${langCode}.wikipedia.org/api/rest_v1/page/summary/${wikipediaSlug}` //encodeURIComponent
  );
  return data;
}
