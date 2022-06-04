import fs from "fs";
import { getWikidataSparql } from "../getWikibaseSparql";
import latinize from "latinize";
import path from "path";
import { WD_ICON } from "../properties";
import { getCommonsUrlByFile } from "../../wikimedia-commons";
interface IProperty {
  p: {
    value: string;
    label: string;
  };
  pt: string;
  [key: string]: any;
}

async function getSortedWikidataSparql(query: string): Promise<IProperty[]> {
  let data: IProperty[] = await getWikidataSparql(query);
  data = data.sort(
    (n1, n2) =>
      parseInt(n1.p.value.substring(1)) - parseInt(n2.p.value.substring(1))
  );
  return data;
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
  let data = await getSortedWikidataSparql(query);
  let labels: any = {};
  let output = "";
  data.forEach((item) => {
    output += `export const WD_${latinize(item.p.label)
      .replace(/\'/g, "") // remove ' to prevent COUNTRY_S
      .replace(/U\.S\./g, "US") //replace US
      .replace(/\W+/g, "_") //remove non-word chars
      .replace(/_$/, "") //remove trailing _ (caused by closing bracket)
      .replace(/__/g, "_") //remove double _
      .toUpperCase()} = "${item.p.value}";\n`;
    labels[item.p.value] = item.p.label;
  });

  fs.writeFileSync(path.resolve(__dirname, "../properties.ts"), output);

  const labelsOutput =
    `export const WIKIDATA_LABELS_EN = ` + JSON.stringify(labels);

  fs.writeFileSync(
    path.resolve(__dirname, "../propertiesLabelsEn.ts"),
    labelsOutput
  );
}

export async function createRegex() {
  const query = `SELECT ?p ?pt ?pLabel ?regex WHERE {
  ?p wikibase:propertyType ?pt .
  ?p wdt:P1793 ?regex.
    SERVICE wikibase:label { 
    bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". 
    }
}`;
  let data = await getSortedWikidataSparql(query);

  let json: any = {};
  data.forEach((item) => {
    json[item.p.value] = item.regex;
  });
  const output = `export const WIKIDATA_REGEX = ` + JSON.stringify(json);
  fs.writeFileSync(path.resolve(__dirname, "../propertiesRegex.ts"), output);
}

export async function createFormatter() {
  const query = `SELECT ?p ?pt ?pLabel ?formatter WHERE {
  ?p wikibase:propertyType ?pt .
  ?p wdt:P1630 ?formatter.
    SERVICE wikibase:label { 
    bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". 
    }
}`;
  let data = await getSortedWikidataSparql(query);

  let json: any = {};
  data.forEach((item) => {
    if (!json[item.p.value]) {
      json[item.p.value] = item.formatter;
    }
  });
  const output = `export const WIKIDATA_URL = ` + JSON.stringify(json);
  fs.writeFileSync(
    path.resolve(__dirname, "../propertiesFormatter.ts"),
    output
  );
}

export async function createIcon() {
  const query = `SELECT ?p ?pt ?pLabel ?icon WHERE {
  ?p wikibase:propertyType ?pt .
  ?p wdt:${WD_ICON} ?icon.
    SERVICE wikibase:label { 
    bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". 
    }
}`;
  let data = await getSortedWikidataSparql(query);

  let json: any = {};
  data.forEach((item) => {
    if (!json[item.p.value]) {
      json[item.p.value] = getCommonsUrlByFile(
        decodeURIComponent(item.icon.split("FilePath/")[1])
      );
    }
  });
  const output = `export const WIKIDATA_ICON = ` + JSON.stringify(json);
  fs.writeFileSync(path.resolve(__dirname, "../propertiesIcon.ts"), output);
}

createConstants();
createRegex();
createFormatter();
createIcon();
