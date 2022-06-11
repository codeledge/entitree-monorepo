import { getWikibaseEntities } from "./getWikibaseEntities";

describe("getWikibaseEntities using factgrid", () => {
  describe("factgrid", () => {
    test("it should not get Q1", async () => {
      const id = "Q1";
      const res = await getWikibaseEntities({
        ids: [id],
        dataSource: "factgrid",
      });
      expect(res[id].missing).toBe(""); //They don't have Q1
      expect(Object.keys(res).length).toBe(1);
    });
    test("it should get Q2", async () => {
      const id = "Q2";
      const res = await getWikibaseEntities({
        ids: [id],
        dataSource: "factgrid",
      });
      expect(res[id].id).toBe(id);
      expect(Object.keys(res).length).toBe(1);
    });
  });
});
