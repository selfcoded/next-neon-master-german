import React from "react";
import LessonWrapper from "../../learn/lessonWrapper";
import { getUserProgress } from "@/db/queries";
import Header from "../../learn/header";

const page = async () => {
  const userProgress = await getUserProgress();
  if (!userProgress || !userProgress.activeCourse) return;
  return (
    <div className="h-[calc(100%-40px)] ">
      <LessonWrapper
        href="/courses/lessons"
        courseId={userProgress.activeCourse.id}
      />
    </div>
  );
};

export default page;
