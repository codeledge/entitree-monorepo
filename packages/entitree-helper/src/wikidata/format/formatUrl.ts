import { WIKIDATA_URL } from "../propertiesFormatter";

export type FormatUrlProps = keyof typeof WIKIDATA_URL;

export function formatUrl(propId: FormatUrlProps, text: string): string {
  const formatter = WIKIDATA_URL[propId];
  return formatter.replace("$1", text);
}
