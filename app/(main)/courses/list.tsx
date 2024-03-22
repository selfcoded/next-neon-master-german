"use client";
import { courses, userProgress } from "@/db/Schema";
import { getCourses } from "@/db/queries";
import React, { useTransition } from "react";
import Card from "./card";
import { useRouter } from "next/navigation";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

type Props = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseID;
};

const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const onClick = (id: number) => {
    if (pending) return;
    if (id === activeCourseId) {
      return router.push("/courses/lessons");
    }
    startTransition(() => {
      upsertUserProgress(id).catch(() => toast.error("something went wrong"));
    });
  };
  return (
    <div className="grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210,ifr))] gap-2">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={pending}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};

export default List;
