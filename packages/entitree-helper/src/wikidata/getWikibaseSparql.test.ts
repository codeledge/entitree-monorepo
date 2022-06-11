import { getWikidataSparql } from "./getWikibaseSparql";

describe("getWikibaseSparql", () => {
  describe("factgrid", () => {});

  describe("wikidata", () => {
    test("it should get his correct birthplace", async () => {
      const res = await getWikidataSparql(`
      SELECT ?item ?birthDate ?birthPlace 
WHERE
{
  VALUES ?item {wd:Q76}
  ?item wdt:P569 ?birthDate.
  ?item wdt:P19 ?birthPlace.
}  `);
      expect(res[0].birthPlace).toBe("Q6366688");
    });
  });
});
