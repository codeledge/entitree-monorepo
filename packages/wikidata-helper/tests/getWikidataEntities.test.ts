import { getSimplifiedWikidataEntities } from "../src";

test("Wikidata", async () => {
  const aveda = await getSimplifiedWikidataEntities(["Q110903311"]);
  const INSTANCE_OF = aveda.Q110903311.claims.P31[0].value;
  expect(INSTANCE_OF).toBe("Q27686"); //hotel
});
