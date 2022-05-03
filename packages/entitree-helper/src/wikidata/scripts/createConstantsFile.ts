import fs from "fs";
import { getWikidataSparql } from "../getWikibaseSparql";
import latinize from "latinize";
import path from "path";
interface IProperty {
  p: {
    value: string;
    label: string;
  };
  pt: string;
}
export async function createConstants() {
  const query = `SELECT ?p ?pt ?pLabel  WHERE {
      ?p wikibase:propertyType ?pt .
#       OPTIONAL {?p skos:altLabel ?alias FILTER (LANG (?alias) = "en")}
#       OPTIONAL {?p schema:description ?d FILTER (LANG (?d) = "en") .}
  SERVICE wikibase:label { 
    bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". 
    }}
`;
  let data: IProperty[] = await getWikidataSparql(query);
  // console.log(data);
  data = data.sort(
    (n1, n2) =>
      parseInt(n1.p.value.substring(1)) - parseInt(n2.p.value.substring(1))
  );
  let output = "";
  data.forEach((item: any) => {
    output += `export const WD_${latinize(item.p.label)
      .replace(/\'/g, "") // remove ' to prevent COUNTRY_S
      .replace(/U\.S\./g, "US") //replace US
      .replace(/\W+/g, "_") //remove non-word chars
      .replace(/_$/, "") //remove trailing _ (caused by closing bracket)
      .replace(/__/g, "_") //remove double _
      .toUpperCase()} = "${item.p.value}";\n`;
  });
  console.log(output);

  fs.writeFileSync(path.resolve(__dirname, "../properties.ts"), output);
}
createConstants();
