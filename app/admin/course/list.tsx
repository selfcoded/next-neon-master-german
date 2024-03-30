import {
  Create,
  Datagrid,
  Edit,
  List,
  SimpleForm,
  TextField,
  TextInput,
  required,
} from "react-admin";

export const CourseList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="imageSrc" />
      </Datagrid>
    </List>
  );
};

export const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput source="imageSrc" validate={[required()]} label="Image" />
      </SimpleForm>
    </Create>
  );
};

export const CourseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput validate={required()} source="id" label="id" />
        <TextInput validate={required()} source="title" label="Title" />
        <TextInput validate={required()} source="imageSrc" label="Image" />
      </SimpleForm>
    </Edit>
  );
};

export default { CourseList, CourseCreate, CourseEdit };
