import * as React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { trpc } from "../src/utils/trpc";
import { Box } from "@mui/material";

export default function SearchInput() {
  const router = useRouter();

  const chordList = trpc.proxy.chord.list.useQuery();

  if (chordList.isLoading) {
    return <Box>Loading...</Box>;
  }
  if (chordList.data) {
    return (
      <Autocomplete
        disablePortal
        id="autocomplete-chord"
        options={chordList.data}
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
}
