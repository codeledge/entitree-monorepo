import { getWikipediaArticle, getWikipediaDescription } from "../src";

test("Wikipedia Article", async () => {
  const wikipedia = await getWikipediaArticle("Anthoni_Salim", "en");
  expect(wikipedia.extract).toContain("Indonesian businessman");
  expect(wikipedia.description).toBe("Chinese-Indonesian businessman");
});

test("Wikipedia Article with slash in name", async () => {
  const wikipedia = await getWikipediaArticle("Sex/Life", "en");
  expect(wikipedia.extract).toContain("television");
  expect(wikipedia.description).toContain("television series");
});
