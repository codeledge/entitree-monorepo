import { formatUrl, WD_INSTAGRAM_USERNAME } from "../src";

test("formatUrl", async () => {
  const instagramUrl = formatUrl(WD_INSTAGRAM_USERNAME, "fanvue");
  expect(instagramUrl).toBe("https://www.instagram.com/fanvue/");
});
