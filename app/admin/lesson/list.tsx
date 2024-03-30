import {
  Create,
  DataProviderContext,
  Datagrid,
  Edit,
  List,
  Pagination,
  ReferenceField,
  ReferenceInput,
  SimpleForm,
  TextField,
  TextInput,
  required,
  useDataProvider,
  useGetList,
} from "react-admin";

export const LessonPagination = () => {
  return <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />;
};

export const LessonList = () => {
  return (
    <List pagination={<LessonPagination />}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="content" />
        <TextField source="introduction" />
        <ReferenceField source="courseId" reference="courses" />
        <TextField source="order" />
      </Datagrid>
    </List>
  );
};

export const LessonCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput source="content" validate={[required()]} label="Content" />
        <TextInput
          source="introduction"
          validate={[required()]}
          label="Introduction"
        />
        <ReferenceInput source="courseId" reference="courses" />
        <TextInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Create>
  );
};

export const LessonEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput source="content" validate={[required()]} label="Content" />
        <TextInput
          source="introduction"
          validate={[required()]}
          label="Introduction"
        />
        <ReferenceInput source="courseId" reference="courses" />
        <TextInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Edit>
  );
};
