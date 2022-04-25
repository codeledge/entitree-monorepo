import { LangCode } from "../types/Lang";
import { getWikipediaArticle } from "..";

export async function getWikipediaDescription(
  wikipediaSlug: string,
  langCode: LangCode = "en"
) {
  const { extract } = await getWikipediaArticle(wikipediaSlug, langCode);
  return extract;
}
