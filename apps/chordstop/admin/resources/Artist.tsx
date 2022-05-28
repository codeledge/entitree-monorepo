import {
  AutocompleteArrayInput,
  AutocompleteInput,
  ChipField,
  Create,
  CreateProps,
  Datagrid,
  DateField,
  Edit,
  EditProps,
  ImageField,
  List,
  ListProps,
  NumberField,
  NumberInput,
  ReferenceArrayField,
  ReferenceArrayInput,
  ReferenceInput,
  Show,
  SimpleForm,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  TextInput,
} from "react-admin";

import { ImageCustomField } from "../Fields/ImageAllField";

export const ArtistList = (props: ListProps) => (
  <List {...props}>
    <Datagrid rowClick={"show"}>
      <TextField source="id" />
      <TextField source="label" />
      <TextField source="wikidataId" />
    </Datagrid>
  </List>
);

export const ArtistShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="label" />
      <TextField source="wikidataId" />
      <TextField source="spotifyArtistId" />
      <ImageCustomField source="imageCommons" />
      <TextField source="appleArtistId" />
      <TextField source="ultimateGuitarId" />
    </SimpleShowLayout>
  </Show>
);
