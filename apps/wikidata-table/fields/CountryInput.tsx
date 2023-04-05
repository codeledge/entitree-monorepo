import { COUNTRIES } from "@entitree/helper";
import { AutocompleteInput } from "react-admin";

const countries = COUNTRIES.map((country) => ({
  id: country.item.split("entity/")[1],
  name: country.itemLabel,
})).sort((a, b) => a.name.localeCompare(b.name));

export const CountryInput = (props: { record?: any; source: string }) => {
  return (
    <AutocompleteInput
      source={props.source}
      choices={countries}
      label="Country"
      title="Country"
      alwaysOn
    />
  );
};
