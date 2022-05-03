import { Admin, Resource } from "react-admin";
import {
  ChordCreate,
  ChordEdit,
  ChordList,
  ChordShow,
} from "./resources/Chord";
import { TagCreate, TagList } from "./resources/Tag";
import { UserCreate, UserEdit, UserList, UserShow } from "./resources/User";

import { dataProvider } from "ra-data-simple-prisma";

const ReactAdmin = () => {
  return (
    <Admin dataProvider={dataProvider("/api")} disableTelemetry>
      {/* <Resource
        name="user"
        list={UserList}
        create={UserCreate}
        edit={UserEdit}
        show={UserShow}
      /> */}
      <Resource
        name="chord"
        list={ChordList}
        create={ChordCreate}
        show={ChordShow}
        edit={ChordEdit}
      />
      {/* <Resource name="tag" list={TagList} create={TagCreate} /> */}
    </Admin>
  );
};

export default ReactAdmin;
