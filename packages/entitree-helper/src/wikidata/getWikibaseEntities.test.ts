import { getWikibaseEntities } from "./getWikibaseEntities";
import { getWikidataEntities } from "./getWikidataEntities";
import { WD_SIGNIFICANT_EVENT } from "./properties";

describe("getWikibaseEntities", () => {
  describe("wikidata", () => {
    test("it should get universe", async () => {
      const id = "Q1";
      const res = await getWikidataEntities([id]);
      expect(res[id].id).toBe(id);
      expect(res["123"]).toBeUndefined();
      const event = res[id].claims?.[WD_SIGNIFICANT_EVENT];
      const BigBang = "Q323";
      const claimsMatched = event?.filter(
        (claim) => claim.mainsnak.datavalue?.value.id === BigBang
      );
      expect(claimsMatched?.length).toBeGreaterThan(0);
    });

    test("it should get languaged", async () => {
      const id = "Q1";
      const res = await getWikibaseEntities({
        ids: [id],
        languages: ["fr", "de"],
        dataSource: "wikidata",
      });
      expect(res[id].labels?.fr).not.toBeUndefined();
      expect(res[id].labels?.de).not.toBeUndefined();
      expect(res[id].labels?.en).toBeUndefined();
    });

    test("it should get props", async () => {
      const id = "Q1";
      const res = await getWikibaseEntities({
        ids: [id],
        props: ["labels"],
        dataSource: "wikidata",
      });
      expect(res[id].labels).not.toBeUndefined();
      expect(res[id].descriptions).toBeUndefined();
    });

    test("getItems with 50 elements limit", async () => {
      const ids: string[] = [];
      for (let index = 1; index <= 51; index += 1) {
        ids.push(`Q${index}`);
      }
      const entitties = await getWikibaseEntities({
        ids,
        props: [],
        dataSource: "wikidata",
      });
      expect(entitties[ids[0]].labels?.en.value).toBe("universe");
      expect(entitties.Q47["missing"]).toBe("");
      expect(entitties[ids[ids.length - 1]].labels?.en.value).toBe(
        "Antarctica"
      );
    }, 40000); // usually done in ~30s
  });
});
