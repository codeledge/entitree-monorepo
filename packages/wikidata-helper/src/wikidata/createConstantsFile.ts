import fs from 'fs';
import { getSparql } from './getSparql';
import path from 'path';

export async function createConstants() {
  const query = `SELECT ?p ?pt ?pLabel  WHERE {
      ?p wikibase:propertyType ?pt .
#       OPTIONAL {?p skos:altLabel ?alias FILTER (LANG (?alias) = "en")}
#       OPTIONAL {?p schema:description ?d FILTER (LANG (?d) = "en") .}
  SERVICE wikibase:label { 
    bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". 
    }}
`;
  const data = await getSparql(query);
  let output = '';
  data.forEach((item: any) => {
    output += `export const WD_${item.p.label
      .replaceAll(/\W+/g, '_')
      .toUpperCase()} = "${item.p.value}";\n`;
  });
  console.log(output);

  fs.writeFileSync(
    path.resolve(__dirname, '../../../../../src/wikidata/properties.ts'),
    output,
  );
}
