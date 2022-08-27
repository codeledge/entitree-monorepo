import { WIKIDATA_LABELS_EN } from "@entitree/helper";

export async function renameClaimIdtoLabel(episodes: any[]) {
  episodes.map((item) => {
    const claims: any = {};
    for (let key in item.claims) {
      claims[(WIKIDATA_LABELS_EN as any)[key]] = item.claims[key];
    }
    item.claims = claims;
  });
  return episodes;
}
