import * as React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { trpc } from "../src/utils/trpc";
import { Box } from "@mui/material";

export default function SearchInput() {
  const router = useRouter();

  const chordList = trpc.chord.list.useQuery();

  if (chordList.isLoading) {
    return;
  }
  if (chordList.data) {
    return (
      <Autocomplete
        disablePortal
        id="autocomplete-chord"
        options={chordList.data}
        getOptionLabel={(option: { id: number; label: string }) => option.label}
        sx={{ width: 300 }}
        size="small"
        onChange={(event, value: { id: number; label: string }) => {
          if (!value?.id) return;
          router.push("/chord/" + value.id);
        }}
        style={{ marginLeft: "3rem", color: "white" }}
        renderInput={(params) => <TextField {...params} label="Chord" />}
      />
    );
  }
}
