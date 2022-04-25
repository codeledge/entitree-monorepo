import { wikidataSearchEntities } from "../src";

test("wikidataSearchEntities", async () => {
  const search = await wikidataSearchEntities("Anthony Salim", "en");
  expect(search.length).toBeGreaterThan(0);
  expect(search[0].label).toContain("Salim");
});
