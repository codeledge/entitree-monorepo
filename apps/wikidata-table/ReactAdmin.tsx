import {
  Admin,
  CustomRoutes,
  Resource,
  StoreContextProvider,
} from "react-admin";

import Documentation from "./custom-pages/Documentation";
import { Layout } from "./layout";
// import LoginPage from "./custom-pages/LoginPage";
import Privacy from "./custom-pages/Privacy";
import React from "react";
import { Route } from "react-router";
import { dataProvider } from "./ra-data-wikidata";
import { WikidataPageArray, WikidataPages } from "./lib/data/page";
import { WikidataList } from "./resources/WikidataList";
import { WikidataShow } from "./resources/WikidataShow";
import { muiIcons } from "./lib/data/muiIcons";
import Dashboard from "./custom-pages/Dashboard";
import { myTheme } from "./layout/theme";
import { QueryClient } from "react-query";

const ReactAdmin = () => {
  // const { data: session, status } = useSession();
  // const loading = status === "loading";

  // if (loading) return null;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 15 * 60 * 1000, // 15 minutes
      },
    },
  });
  return (
    <Admin
      disableTelemetry
      dashboard={Dashboard}
      dataProvider={dataProvider("/api/")}
      layout={Layout}
      theme={myTheme}
      queryClient={queryClient}

      // loginPage={LoginPage}
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
