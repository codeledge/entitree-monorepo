export function byYear(content: string, header = "", footer = ""): string {
  return `SELECT ?search ?searchLabel ?year ${header}
WHERE
{
  VALUES ?search {wd:$1}
  ${content}
  ?item p:$d/psv:$d [
                wikibase:timePrecision ?precision ;
                wikibase:timeValue ?date ;
              ] .
  BIND(YEAR(?date) as ?year).
  FILTER( ?date >= "2000-01-01T00:00:00"^^xsd:dateTime )
  FILTER( ?precision >= "9"^^xsd:integer ) # precision of at least year
  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "en"
  }
}
GROUP BY ?year ?search ?searchLabel ${footer}
ORDER BY ?year`;
}

export function basicQuery(content: string, header = "", footer = ""): string {
  return `SELECT ?search ?searchLabel ${header}
WHERE 
{
  VALUES ?search {wd:$1}.
  ${content}
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}
${footer}
`;
}
