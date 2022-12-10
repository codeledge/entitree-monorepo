import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { trpc } from "../src/utils/trpc";

export default function SearchInput() {
  const router = useRouter();

  const chordList = trpc.chord.list.useQuery(undefined, {
    staleTime: 1000 * 60 * 60 * 24,
  });

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
        onChange={(event, value: any) => {
          //value is an array but should be an object
          if (!value?.id) return;
          router.push("/chord/" + value.id);
        }}
        style={{ marginLeft: "3rem", color: "white" }}
        renderInput={(params) => (
          <TextField
            {...params}
            key={params.id} // double check
            label="Chord"
          />
        )}
      />
    );
  }
}
