import { WD_CANDIDACY_IN_ELECTION } from "@entitree/helper";
import { AutocompleteInput } from "react-admin";

const DPR = [
  {
    item: "http://www.wikidata.org/entity/Q108816797",
    itemLabel: "2014 Indonesian People's Representative Council election",
  },
  {
    item: "http://www.wikidata.org/entity/Q108887023",
    itemLabel: "2019 Indonesian People's Representative Council election",
  },
  {
    item: "http://www.wikidata.org/entity/Q109682732",
    itemLabel: "2009 Indonesian People's Representative Council election",
  },
  {
    item: "http://www.wikidata.org/entity/Q109719080",
    itemLabel: "2004 Indonesian People's Representative Council election",
  },
];

export const politiciansFilter = [
  <AutocompleteInput
    key={WD_CANDIDACY_IN_ELECTION}
    source={WD_CANDIDACY_IN_ELECTION}
    label="candidacy"
    choices={DPR.map((d) => ({
      id: d.item.split("entity/")[1],
      name: d.itemLabel,
    }))}
    alwaysOn
  />,
];
