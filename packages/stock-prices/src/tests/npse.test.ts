import { getNepseTodaysPrice } from "../";

describe("Nepal Stock", () => {
  describe("todaysprice", () => {
    test("it should", async () => {
      const price = await getNepseTodaysPrice("2022-05-25");
      console.log(price);
      price.toBe(0);
    });
  });
});
