import * as React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { createStyles, makeStyles } from "@mui/material";

export default function SearchInput() {
  const [chords, setChords] = React.useState([]);
  const router = useRouter();
  // const useStyles = makeStyles(() =>
  //   createStyles({
  //     root: {
  //       "& .MuiAutocomplete-listbox": {
  //         border: "2px solid grey",
  //         minHeight: 400,
  //         color: "green",
  //         fontSize: 18,
  //         //hover discussed above
  //         "& li": {
  //           //list item specific styling
  //           border: "2px solid green",
  //           borderRadius: 4,
  //         },
  //       },
  //     },
  //   })
  // );
  // const classes = useStyles();

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/api/getAllChords");
      const data = await result.json();
      setChords(data.chords);
    };
    fetchData();
  }, []);
  return (
    <Autocomplete
      disablePortal
      id="autocomplete-chord"
      options={chords}
      getOptionLabel={(option) => option.label}
      sx={{ width: 300 }}
      size="small"
      onChange={(event, value) => {
        router.push("/chord/" + value.id);
      }}
      style={{ marginLeft: "3rem", color: "white" }}
      renderInput={(params) => <TextField {...params} label="Chord" />}
    />
  );
}
