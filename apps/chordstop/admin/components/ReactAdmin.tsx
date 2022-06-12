import {
  Admin,
  EditGuesser,
  ListGuesser,
  Resource,
  ShowGuesser,
} from "react-admin";
import { ArtistCreate, ArtistList, ArtistShow } from "../resources/Artist";
import {
  ChordCreate,
  ChordEdit,
  ChordList,
  ChordShow,
} from "../resources/Chord";

import { dataProvider } from "ra-data-simple-prisma";
import { authProvider } from "../../providers/authProvider";
import { useSession } from "next-auth/react";
import LoginPage from "../custom-pages/LoginPage";
import { userInfo } from "os";

const ReactAdmin: React.FC = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <Admin
      dataProvider={dataProvider("/api")}
      disableTelemetry
      authProvider={authProvider(session)}
      loginPage={LoginPage}
    >
      {/* {session.user.name === "admin" && ( */}
      <Resource
        name="user"
        list={ListGuesser}
        // create={UserCreate}
        edit={EditGuesser}
        show={ShowGuesser}
      />
      {/* )} */}
      <Resource
        name="chord"
        list={ChordList}
        create={ChordCreate}
        show={ChordShow}
        edit={ChordEdit}
      />
      <Resource
        name="artist"
        list={ArtistList}
        show={ArtistShow}
        create={ArtistCreate}
      />
      {/* <Resource name="tag" list={TagList} create={TagCreate} /> */}
    </Admin>
  );
};

export default ReactAdmin;
