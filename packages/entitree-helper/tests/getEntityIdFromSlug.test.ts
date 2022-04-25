import { getEntityIdFromSlug } from "../src";

test("getEntityIdFromSlug", async () => {
  const germanyId = await getEntityIdFromSlug("Germany", "en");
  expect(germanyId).toBe("Q183");
});
