import { Page } from "../lib/data/types";

function gc(id) {
  return `(group_concat(DISTINCT ?${id}_;separator=", ") as ?${id} ) `;
}
export const sparqlQueryCreate = (table: Page) => {
  let r = {
    top: "",
    body: "",
    label: "",
    labelService: "",
  };
  for (let t of table.header) {
    // sparqlTop += ` ?${t.property} ?${t.property}Label `;
    r.top += gc(t.property);
    r.top += gc(t.property + "Label") + "\n";

    r.body += `OPTIONAL { ?item wdt:${t.property} ?${t.property}_. }\n`;
    r.label += `?${t.property}_ rdfs:label ?${t.property}Label_ .\n`;
  }
  r.labelService = `
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en".
    ?item rdfs:label ?itemLabel.
    ${r.label}
  }`;
  return r;
};
