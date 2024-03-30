import {
  Create,
  Datagrid,
  Edit,
  List,
  ReferenceField,
  ReferenceInput,
  SelectField,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  required,
} from "react-admin";

export const ExerciseList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <ReferenceField source="lessonId" reference="lessons" />
        <SelectField
          source="type"
          choices={[
            {
              id: "SINGLE_CHOICE",
              name: "SINGLE_CHOICE",
            },
            {
              id: "GAP_FILLING",
              name: "GAP_FILLING",
            },
          ]}
        />
        <TextField source="question" />
        <TextField source="order" />
      </Datagrid>
    </List>
  );
};

export const ExerciseCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="id" validate={[required()]} label="id" />
        <ReferenceInput source="lessonId" reference="lessons" />
        <SelectInput
          source="type"
          choices={[
            {
              id: "SINGLE_CHOICE",
              name: "SINGLE_CHOICE",
            },
            {
              id: "GAP_FILLING",
              name: "GAP_FILLING",
            },
          ]}
        />
        <TextInput source="question" validate={[required()]} label="Question" />
        <TextInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Create>
  );
};

export const ExerciseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" validate={[required()]} label="id" />
        <ReferenceInput source="lessonId" reference="lessons" />
        <SelectInput
          source="type"
          choices={[
            {
              id: "SINGLE_CHOICE",
              name: "SINGLE_CHOICE",
            },
            {
              id: "GAP_FILLING",
              name: "GAP_FILLING",
            },
          ]}
        />
        <TextInput source="question" validate={[required()]} label="Question" />
        <TextInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Edit>
  );
};
