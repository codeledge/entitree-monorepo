import * as React from "react";
import { Title, useTranslate, useGetIdentity, useGetOne } from "react-admin";
import { useSession } from "next-auth/react";
import Card from "@mui/material/Card";

const SettingsPage = () => {
  const translate = useTranslate();
  const { data } = useSession();
  const { identity, isLoading: identityLoading } = useGetIdentity();

  return (
    <Card>
      <pre>{JSON.stringify({ data, identity }, null, 2)}</pre>
    </Card>
  );
};

export default SettingsPage;
