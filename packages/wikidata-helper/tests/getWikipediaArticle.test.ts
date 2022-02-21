import { getWikipediaArticle, getWikipediaDescription } from "../src";

test("WikipediaARticle", async () => {
  const wikipedia = await getWikipediaArticle("Anthoni_Salim", "en");
  expect(wikipedia.extract).toContain("Indonesian businessman");
  expect(wikipedia.description).toBe("Chinese-Indonesian businessman");
});
// test("it should give the correct name", async () => {
//   const res = await getWikipediaDescription("Elvis_Presley");
//   expect(res).toBe(
//     `Elvis Aaron Presley was an American singer and actor. Dubbed the \"King of Rock and Roll\", he is regarded as one of the most significant cultural icons of the 20th century. His energized interpretations of songs and sexually provocative performance style, combined with a singularly potent mix of influences across color lines during a transformative era in race relations, led him to both great success and initial controversy.`
//   );
// });
