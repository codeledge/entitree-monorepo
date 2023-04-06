import { WD_PARTICIPANT_IN } from "@entitree/helper";
import { AutocompleteInput } from "react-admin";

const Events = [
  {
    item: "http://www.wikidata.org/entity/Q114717230",
    itemLabel: "World Economic Forum Annual Meeting 2014",
  },
  {
    item: "http://www.wikidata.org/entity/Q114717231",
    itemLabel: "World Economic Forum Annual Meeting 2015",
  },
];

export const eventFilter = [
  <AutocompleteInput
    key={WD_PARTICIPANT_IN}
    source={WD_PARTICIPANT_IN}
    label="participant"
    choices={Events.map((d) => ({
      id: d.item.split("entity/")[1],
      name: d.itemLabel,
    }))}
    alwaysOn
  />,
];
