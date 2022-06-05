import { getWikidataSparql, WD_UNICODE_CHARACTER } from "@entitree/helper";
import { WikidataPageArray } from "../../../lib/data/page";
// import fs from "fs";
// import path from "path";

export default async function handler(req, res) {
  const e = await getEmojis();
  console.log(e);
  res.json({ html: e });
}
const getEmojis = async () => {
  const searchIds = WikidataPageArray.filter((t) => t.represents).map(
    (t) => t.represents
  );
  const query = `
    SELECT DISTINCT ?item ?itemLabel ?emoji
      WHERE 
      {
        VALUES ?item {wd:${searchIds.join("\n wd:")}}
        ?item wdt:${WD_UNICODE_CHARACTER} ?emoji
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }`;
  console.log(query);

  const data = await getWikidataSparql(query);
  console.log(data);
  let emojis = {};
  for (let i of data) {
    emojis[i.item.value] = i.emoji;
  }
  console.log(emojis);
  return `export const PAGE_EMOJI = ` + JSON.stringify(emojis);
  // fs.writeFileSync(
  //   path.resolve(__dirname, "../../lib/emojis.ts"),
  //   `export const PAGE_EMOJI = ` + JSON.stringify(emojis)
  // );
};
