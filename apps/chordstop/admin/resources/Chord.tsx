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
  List,
  ListProps,
  NumberField,
  NumberInput,
  ReferenceArrayField,
  ReferenceArrayInput,
  ReferenceInput,
  SelectInput,
  Show,
  SimpleForm,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  TextInput,
  required,
  ReferenceField,
} from "react-admin";
const chordFilters = [
  <TextInput label="Song" source="title" alwaysOn />,
  // <TextInput label="Title" source="title" defaultValue="Hello, World!" />,
];
export const ChordList = (props: ListProps) => (
  <List {...props} filters={chordFilters}>
    <Datagrid rowClick={"show"}>
      <TextField source="id" />
      <TextField source="title" />
      <ReferenceField source="artistId" reference="artist">
        <TextField source="label" />
      </ReferenceField>
      <NumberField source="hits" />
    </Datagrid>
  </List>
);
export const ChordShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <ReferenceField source="artistId" reference="artist">
        <TextField source="label" />
      </ReferenceField>
      <TextField
        source="body"
        style={{ fontFamily: "monospace", whiteSpace: "pre" }}
      />
    </SimpleShowLayout>
  </Show>
);

export const ChordEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="title" />
      {/* <SelectInput source="artist" /> */}
      {/* <ReferenceInput
        label="Artist"
        source="artistId"
        reference="artist"
        validate={[required()]}
      >
        <SelectInput optionText="label" />
      </ReferenceInput> */}
      <ReferenceInput source="artistId" reference="artist">
        <SelectInput optionText="label" />
      </ReferenceInput>

      {/* <ReferenceField source="artistId" reference="artist">
        <SelectInput source="id" />
      </ReferenceField> */}

      {/* <TextInput source="artist" /> */}
      <TextInput multiline source="body" style={{ width: "100%" }} />
    </SimpleForm>
  </Edit>
);

export const ChordCreate = (props: CreateProps) => (
  <Create title="New chord" {...props}>
    <SimpleForm>
      {/* <TextInput source="id" /> */}
      <TextInput source="title" validate={[required()]} />
      {/* <ReferenceInput label="Artist" source="artistId" reference="artist">
        <AutocompleteInput optionText="label" />
      </ReferenceInput> */}
      <ReferenceInput source="artistId" reference="artist">
        <AutocompleteInput optionText="label" />
      </ReferenceInput>
      <NumberInput source="hits" defaultValue={0} />
      <TextInput
        multiline
        source="body"
        style={{ width: "100%" }}
        validate={[required()]}
      />
    </SimpleForm>
  </Create>
);
