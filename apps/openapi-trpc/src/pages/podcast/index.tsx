import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  Card,
  Typography,
  ListItem,
  ListItemText,
} from "@mui/material";
import { trpc } from "../../utils/trpc";
import { POPULAR_PODCASTS } from "@codeledge/podcast";

export default function BasicTextFields() {
  const [cookie, setCookieField] = React.useState("");

  // const profile = trpc.useQuery(["apple.getItunesShowEpisodes"]);

  return (
    <Card>
      <Typography variant="h4" gutterBottom component="div">
        Podcast List
      </Typography>
      {/* <Box
        component="form"
        sx={{
          width: "100%",
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Cookie"
          helperText="Copy the cookie, this can be quite long"
          onChange={(event) => setCookieField(event.target.value)}
        />

        <Button variant="contained" color="primary" onClick={() => {}}>
          Subs
        </Button>
      </Box> */}
      <ul>
        {POPULAR_PODCASTS.map((podcast) => (
          <ListItem key={podcast.id}>
            <ListItemText primary={podcast.title} />
          </ListItem>
        ))}
      </ul>
    </Card>
  );
}
