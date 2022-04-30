import { INDICATOR_GROUPS, IndicatorInfo, queries } from "../sparql/queries";

export async function indicatorSearch(
  searchTerm: string
): Promise<GROUP_OPTIONS[] | IndicatorInfo[] | undefined> {
  if (searchTerm.length == 0) {
    return groupArray(queries);
  }
  if (searchTerm.length < 3) {
    return [({ error: "Type more..." } as unknown) as IndicatorInfo];
  }
  try {
    const ret = queries.filter((element) => element.name.includes(searchTerm));
    return groupArray(ret);
  } catch (e) {
    console.error("authorsSearch", e);
    throw e;
  }
}

export function getIndicatorByKey(indicatorCode: string) {
  return queries.find((element) => element.code == indicatorCode);
}

export type GROUP_OPTIONS = {
  label: string;
  options: IndicatorInfo[];
};

function groupArray(arr: IndicatorInfo[]) {
  let ret: GROUP_OPTIONS[] = [];
  INDICATOR_GROUPS.forEach((group) => {
    ret.push({
      label: group,
      options: arr.filter((element) => element.group == group),
    });
  });
  return ret;
}
