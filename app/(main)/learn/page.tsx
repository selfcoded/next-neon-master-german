import Feed from "@/app/components/feed";
import StickyWrapper from "@/app/components/stickyWrapper";
import React from "react";
import Header from "@/app/(main)/learn/header";
import UserProgress from "./userPropgress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import LessonWrapper from "./lessonWrapper";

const page = async () => {
  const userProgressPromise = getUserProgress();
  const [userProgress] = await Promise.all([userProgressPromise]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex gap-x-[30px] relative px-6">
      <Feed>
        <Header title={userProgress.activeCourse.title} />
        <LessonWrapper href="/learn" courseId={userProgress.activeCourse.id} />
      </Feed>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress?.activeCourse}
          points={5}
          hearts={5}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
    </div>
  );
};

export default page;
