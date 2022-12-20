import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { trpc } from "../../utils/trpc";

export default function BasicTextFields() {
  const [nik, setNik] = React.useState("");

  const { data, error } = trpc.document.parseNik.useQuery({
    nik,
  });

  return (
    <Card>
      <Typography
        variant="h4"
        gutterBottom
      >
        Parse NIK
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
      >
        <TextField
          label="NIK"
          helperText="16 digits"
          onChange={(event) => setNik(event.target.value)}
        />
        {/* 
        <Button
          variant="contained"
          color="primary"
          onClick={() => {}}
        >
          Subs
        </Button> */}
      </Box>
      <br />
      {error && <div>{error.message}</div>}
      {JSON.stringify(data)}
    </Card>
  );
}
