import { getWikipediaArticle } from "..";

export async function getWikipediaDescription(
  wikipediaSlug: string,
  langCode: string = "en"
) {
  const { extract } = await getWikipediaArticle(wikipediaSlug, langCode);
  return extract;
}
