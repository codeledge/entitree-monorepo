import abbreviateNumber from "../src/formatters/abbreviateNumber";

test("1500000 is 150k", () => {
  expect(abbreviateNumber(150000)).toBe("150K");
});
