import * as React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Title } from "react-admin";
import { useSession } from "next-auth/react";

export const MyAccount = () => {
  const { data: session, status } = useSession();

  return (
    <Card>
      <Title title={"Configuration"} />
      <CardContent>
        <Typography
          variant="h4"
          gutterBottom
        >
          Configuration
        </Typography>
        <Box sx={{ width: "10em", display: "inline-block" }}>Signed in as:</Box>
        <div>{session?.user?.name}</div>
        <div>{session?.user?.email}</div>
        <div>Status: {status}</div>
        <div>Role: {session?.role}</div>
      </CardContent>
    </Card>
  );
};
