import * as React from "react";

import { Title, useTranslate } from "react-admin";
import Card from "@mui/material/Card";

const Privacy = () => {
  const translate = useTranslate();
  return (
    <Card>
      <Title title={translate("resources.privacy.name", { smart_count: 2 })} />
      to be written by some smart lawyer
    </Card>
  );
};

export default Privacy;
