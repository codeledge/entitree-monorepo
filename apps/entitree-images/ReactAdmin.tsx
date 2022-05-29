import {
  Admin,
  CustomRoutes,
  EditGuesser,
  ListGuesser,
  Resource,
  ShowGuesser,
} from "react-admin";

import Dashboard from "./resources/dashboard/Dashboard";
import Documentation from "./custom-pages/Documentation";
import { ImageCreate } from "./resources/ImageCreate";
import { ImageEdit } from "./resources/ImageEdit";
import { ImageList } from "./resources/ImageList";
import { ImageShow } from "./resources/ImageShow";
import { Layout } from "./layout";
import LoginPage from "./custom-pages/LoginPage";
import Privacy from "./custom-pages/Privacy";
import React from "react";
import { UserList } from "./resources/UserList";
import { authProvider } from "./providers/authProvider";
// import { dataProvider } from "./providers/dataProvider";
import { i18nProvider } from "./providers/i18nProvider";
import { useSession } from "next-auth/react";
import { Route } from "react-router";
import { dataProvider } from "ra-data-simple-prisma";

const ReactAdmin = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) return null;
  return (
    <Admin
      disableTelemetry
      authProvider={authProvider(session)}
      dashboard={Dashboard}
      dataProvider={dataProvider("/api/admin")}
      i18nProvider={i18nProvider}
      // layout={Layout}
      // loginPage={LoginPage}
    >
      <CustomRoutes>
        <Route key="key" path="/documentation" element={<Documentation />} />
        <Route key="key" path="/privacy" element={<Privacy />} />,
      </CustomRoutes>
      <Resource
        name="image"
        show={ImageShow}
        list={ImageList}
        create={ImageCreate}
        edit={ImageEdit}
      />
      <Resource
        name="user"
        list={ListGuesser}
        // create={UserCreate}
        edit={EditGuesser}
        show={ShowGuesser}
      />
    </Admin>
  );
};

export default ReactAdmin;

// {
//   (userRole) => [
//     <Resource
//       key="images"
//       name="images"
//       show={ImageShow}
//       list={ImageList}
//       create={ImageCreate}
//       edit={ImageEdit}
//     />,
//     userRole === "admin" ? (
//       <Resource name="users" list={UserList} edit={EditGuesser} />
//     ) : (
//       undefined
//     ),
//   ];
// }
