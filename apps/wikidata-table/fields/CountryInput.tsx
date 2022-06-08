import { AutocompleteInput, SelectInput } from "react-admin";
import { WIKIDATA_COUNTRIES } from "../lib/data/countries";

const countries = WIKIDATA_COUNTRIES.map((country) => ({
  id: country.item.split("entity/")[1],
  name: country.itemLabel,
})).sort((a, b) => a.name.localeCompare(b.name));

export const CountryInput = (props: { record?: any; source: string }) => {
  return (
    <AutocompleteInput
      source={props.source}
      choices={countries}
      label="Country"
      alwaysOn
      title="Country"
    />
  );
};
