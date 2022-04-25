import { durationToSeconds } from "../src";

test("Youtube duration to seconds", () => {
  expect(durationToSeconds("PT27M42S")).toBe(1662);
  expect(durationToSeconds("PT1H5M43S")).toBe(3943);
});
