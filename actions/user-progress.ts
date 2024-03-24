"use server";

import { comments, userProgress } from "@/db/Schema";
import db from "@/db/drizzle";
import { getCourseById, getLesson, getUserProgress } from "@/db/queries";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();
  const user = await currentUser();

  // if(!userId ||)
  const course = await getCourseById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      username: user?.firstName || "user",
      userImageSrc: user?.imageUrl || "/unknown.png",
    });
    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/courses/lessons");
  }
  await db.insert(userProgress).values({
    userId: userId?.toString()!,
    activeCourseId: courseId,
    username: user?.firstName || "user",
    userImageSrc: user?.imageUrl || "/unknown.png",
  });
  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/courses/lessons");
};

export const upsertComments = async (title: string, comment: string) => {
  const { userId } = await auth();
  const user = await currentUser();

  // if(!userId ||)
  const lesson = await getLesson(title);

  if (!lesson) {
    throw new Error("Course not found");
  }
  await db.insert(comments).values({
    userId: userId?.toString()!,
    username: user?.firstName || "user",
    comments: comment,
    userImageSrc: user?.imageUrl || "/unknown.png",
    createAt: new Date(),
    lessonId: lesson.id,
  });
  revalidatePath(`/courses/lessons/${title}`);
  revalidatePath(`/learn/lessons/${title}/exercises`);
  // revalidatePath("/learn");
  // redirect("/courses/lessons");
};
