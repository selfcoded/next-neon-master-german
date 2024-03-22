import React from "react";
import LessonWrapper from "../../learn/lessonWrapper";
import { getUserProgress } from "@/db/queries";
import Header from "../../learn/header";

const page = async () => {
  const userProgress = await getUserProgress();
  if (!userProgress || !userProgress.activeCourse) return;
  return (
    <div>
      <Header title={userProgress.activeCourse.title} />
      <LessonWrapper
        href="/courses/lessons"
        courseId={userProgress.activeCourse.id}
      />
    </div>
  );
};

export default page;
