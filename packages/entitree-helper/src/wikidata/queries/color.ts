import { getWikidataSparql } from "../getWikibaseSparql";

export async function getColorByWikidataItem(
  id: string
): Promise<string | null> {
  const COLOR_QUERY = `SELECT ?item ?itemLabel ?color ?hex WHERE {
  VALUES ?item {wd:$1}
    { ?item wdt:P465 ?hex. } 
  UNION {
    ?item wdt:P163 ?flag.
    ?flag p:P462 ?color.
    ?color pq:P465 ?hex.
    }
}`;
  let colorRequest = await getWikidataSparql(COLOR_QUERY.replace("$1", id));
  return colorRequest?.[0]?.hex ? "#" + colorRequest[0].hex : null;
}
