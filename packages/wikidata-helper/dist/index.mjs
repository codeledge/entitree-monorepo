// src/getWikipediaArticle.ts
import axios from "axios";
async function getWikipediaArticle(wikipediaSlug, langCode = "en") {
  const { data } = await axios.get(`https://${langCode}.wikipedia.org/api/rest_v1/page/summary/${wikipediaSlug}`);
  return data;
}

// src/getWikipediaDescription.ts
async function getWikipediaDescription(wikipediaSlug, langCode = "en") {
  const { extract } = await getWikipediaArticle(wikipediaSlug, langCode);
  return extract;
}
export {
  getWikipediaArticle,
  getWikipediaDescription
};
