import { WIKIDATA_URL } from "../propertiesFormatter";

type PROPERTIES = keyof typeof WIKIDATA_URL;

export function formatUrl(propId: PROPERTIES, text: string): string {
  const formatter = WIKIDATA_URL[propId];
  return formatter.replace("$1", text);
}
