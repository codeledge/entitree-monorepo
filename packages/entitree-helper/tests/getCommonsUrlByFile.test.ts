import { getCommonsUrlByFile } from "../src";

test("getCommonsUrlByFile", async () => {
  const ra_logo = getCommonsUrlByFile("React_Admin_logo.svg");
  expect(ra_logo).toBe(
    "https://upload.wikimedia.org/wikipedia/commons/1/15/React_Admin_logo.svg"
  );
  const bob = getCommonsUrlByFile(
    "http://commons.wikimedia.org/wiki/Special:FilePath/Joan%20Baez%20Bob%20Dylan%20crop.jpg"
  );
  expect(bob).toBe(
    "https://upload.wikimedia.org/wikipedia/commons/2/28/Joan_Baez_Bob_Dylan_crop.jpg"
  );
});
