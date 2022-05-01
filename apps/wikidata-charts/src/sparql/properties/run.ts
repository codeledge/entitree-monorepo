import fs from "fs";
import { getWikidataSparql } from "@entitree/helper";
import path from "path";
import { quantityProps } from "./quantity";

type SparqlRes = {
  item: string;
  itemLabel: string;
};

export async function updateSparqlItems() {
  const parentFolder = "src/sparql/properties/";
  const templateSparql = fs.readFileSync(
    path.resolve(process.cwd(), parentFolder + "getIds.rq"),
    "utf8"
  );

  const props: SparqlRes[] = quantityProps;
  const excluded = [
    "http://www.wikidata.org/entity/P1082",
    "http://www.wikidata.org/entity/P1087",
  ];
  for (let prop of props) {
    if (!excluded.includes(prop.item)) {
      const propId = prop.item.split("entity/")[1];
      const writeFile = path.resolve(
        process.cwd(),
        parentFolder + "res/" + propId + ".json"
      );
      console.log(writeFile, propId);
      try {
        const query = templateSparql.replaceAll("$p", propId);
        if (!fs.existsSync(writeFile)) {
          const res = await getWikidataSparql(query);
          fs.writeFileSync(writeFile, JSON.stringify(res));
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      } catch (e) {
        console.log("failed", e);
      }
    }
  }
  return;
}
