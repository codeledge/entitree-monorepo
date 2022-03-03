import { toSeconds } from "../src/youtube/youtube-helper";

test("Youtube duration to seconds", () => {
  expect(toSeconds("PT27M42S")).toBe(1662);
  expect(toSeconds("PT1H5M43S")).toBe(3943);
});
