"use client";
import { Admin, Resource, fetchUtils } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { CourseCreate, CourseEdit, CourseList } from "./course/list";
import { LessonCreate, LessonEdit, LessonList } from "./lesson/list";
import { ExerciseCreate, ExerciseEdit, ExerciseList } from "./exercise/list";

const dataProvider = simpleRestProvider("/api");

// const httpClient = (url: string, options: fetchUtils.Options = {}) => {
//   const customHeaders = (options.headers ||
//       new Headers({
//           Accept: 'application/json',
//       })) as Headers;
//   // add your own headers here
//   customHeaders.set('Content-Range', dataProvider.getList());
//   options.headers = customHeaders;
//   return fetchUtils.fetchJson(url, options);
// }

console.log(dataProvider);

const dynamicApp = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        list={<CourseList />}
        create={CourseCreate}
        edit={CourseEdit}
        recordRepresentation="title"
      />
      <Resource
        name="lessons"
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
        recordRepresentation="title"
      />
      <Resource
        name="exercises"
        list={ExerciseList}
        create={ExerciseCreate}
        edit={ExerciseEdit}
        recordRepresentation="title"
      />
    </Admin>
  );
};

export default dynamicApp;
