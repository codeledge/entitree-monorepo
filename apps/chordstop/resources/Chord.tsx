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
} from "react-admin";

export const ChordList = (props: ListProps) => (
  <List {...props}>
    <Datagrid rowClick={"show"}>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="artist" />
      {/* <TextField source="body" /> */}
      <NumberField source="hits" />
      {/* <ReferenceArrayField label="Tags" reference="tag" source="tags">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField> */}
    </Datagrid>
  </List>
);
export const ChordShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="artist" />
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
      <SelectInput source="artist" />
      <ReferenceInput
        label="Artist"
        source="artistId"
        reference="artist"
        validate={[required()]}
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
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
      <ReferenceInput label="Artist" source="artistId" reference="artist">
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
