"use server";

import { userProgress } from "@/db/Schema";
import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
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
      activeCourseID: courseId,
      username: user?.firstName || "user",
      userImageSrc: user?.imageUrl || "/unknown.png",
    });
    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/courses/lessons");
  }
  await db.insert(userProgress).values({
    userId: userId?.toString()!,
    activeCourseID: courseId,
    username: user?.firstName || "user",
    userImageSrc: user?.imageUrl || "/unknown.png",
  });
  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/courses/lessons");
};
