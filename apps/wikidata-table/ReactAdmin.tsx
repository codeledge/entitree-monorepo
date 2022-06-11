import {
  Admin,
  CustomRoutes,
  EditGuesser,
  ListGuesser,
  Resource,
  ShowGuesser,
} from "react-admin";

import Documentation from "./custom-pages/Documentation";
import { Layout } from "./layout";
import LoginPage from "./custom-pages/LoginPage";
import Privacy from "./custom-pages/Privacy";
import React from "react";
import { authProvider } from "./providers/authProvider";
// import { dataProvider } from "./providers/dataProvider";
// import { useSession } from "next-auth/react";
import { Route } from "react-router";
import { dataProvider } from "./ra-data-wikidata";
import { WikidataPageArray, WikidataPages } from "./lib/data/page";
import { WikidataList } from "./resources/WikidataList";
import { WikidataShow } from "./resources/WikidataShow";
import { muiIcons } from "./lib/data/muiIcons";
import Dashboard from "./custom-pages/Dashboard";

const ReactAdmin = () => {
  // const { data: session, status } = useSession();
  // const loading = status === "loading";

  // if (loading) return null;
  return (
    <Admin
      disableTelemetry
      // authProvider={authProvider(session)}
      dashboard={Dashboard}
      dataProvider={dataProvider("/api/")}
      // i18nProvider={i18nProvider}
      layout={Layout}
      loginPage={LoginPage}
    >
      <CustomRoutes>
        <Route key="key" path="/documentation" element={<Documentation />} />
        <Route key="key" path="/privacy" element={<Privacy />} />,
      </CustomRoutes>

      {WikidataPageArray.map((page) =>
        muiIcons[page.id] ? (
          <Resource
            key={page.id}
            name={page.id}
            list={WikidataList(page)}
            show={WikidataShow(page.header)}
            // icon={<Icon>star</Icon>}
          />
        ) : (
          <Resource
            key={page.id}
            name={page.id}
            list={WikidataList(page)}
            show={WikidataShow(page.header)}
          />
        )
      )}
    </Admin>
  );
};

export default ReactAdmin;
