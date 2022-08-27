import { WD_PART_OF_THE_SERIES } from "@entitree/helper";
import { AutocompleteInput } from "react-admin";
import { POPULAR_PODCASTS } from "@codeledge/podcast";

export const podcastFilter = [
  <AutocompleteInput
    key={WD_PART_OF_THE_SERIES}
    source={WD_PART_OF_THE_SERIES}
    label="part of"
    choices={POPULAR_PODCASTS.map((d) => ({
      id: d.id,
      name: d.title,
    }))}
    alwaysOn
  />,
];
