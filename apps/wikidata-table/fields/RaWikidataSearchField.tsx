import { WikidataSearchResult, wikidataSearchEntities } from "@entitree/helper";
import { useEffect, useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export const RaWikidataSearchField = ({
  onSelect,
  item,
}: {
  onSelect: Function;
  item?: WikidataSearchResult;
}) => {
  const [results, setResults] = useState<WikidataSearchResult[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputValue.length > 2) {
      wikidataSearchEntities(inputValue, "en")
        .then((res) => {
          setResults(res);
        })
        .catch((error) => console.log(error));
    }
  }, [inputValue]);

  return (
    <Autocomplete
      freeSolo
      onChange={(e, item) => {
        onSelect(item);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={results}
      style={{
        width: "100%",
      }}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Wikidata Entity"
          value={item ? getOptionLabel(item) : null}
        />
      )}
    />
  );
};

const getOptionLabel = (sarchResult: WikidataSearchResult) =>
  `${sarchResult.label} (${sarchResult.description})`;
