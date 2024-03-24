import Header from "@/app/(main)/learn/header";
import { Button } from "@/components/ui/button";
import {
  getComments,
  getLesson,
  getLessons,
  getUserProgress,
} from "@/db/queries";
import { redirect } from "next/navigation";
import Image from "next/image";
import React from "react";
import Comment from "../../../../components/comment";
import SubmitComment from "./submitComment";
import Link from "next/link";
import LessonDisplay from "@/app/components/lessonDisplay";

const page = async ({ params }: { params: { title: string } }) => {
  const { title } = params;
  const lesson = await getLesson(title);

  if (!lesson) {
    redirect("/courses");
  }
  const comments = await getComments(lesson.id);

  return (
    <div className="flex flex-col justify-start h-[calc(100vh-70px)]">
      <div className="flex flex-col gap-y-2 h-full w-full">
        <LessonDisplay title={title} content={lesson.content} />
        {comments.length > 0 &&
          comments.map((comment, index) => (
            <div key={comment.commentId + index}>
              <Comment value={comment} />
            </div>
          ))}
        <SubmitComment title={title} />
      </div>
    </div>
  );
};

export default page;
