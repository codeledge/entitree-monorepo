import { getCommonsUrlByFile } from "../src";

test("getCommonsUrlByFile", async () => {
  const ra_logo = getCommonsUrlByFile("React_Admin_logo.svg");
  expect(ra_logo).toBe(
    "https://upload.wikimedia.org/wikipedia/commons/1/15/React_Admin_logo.svg"
  );
});
