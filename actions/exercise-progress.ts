"use server";

import {
  comments,
  exerciseProgress,
  exercises,
  lessons,
  userProgress,
} from "@/db/Schema";
import db from "@/db/drizzle";
import { getCourseById, getLesson, getUserProgress } from "@/db/queries";
import { auth, currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertExerciseProgress = async (exerciseId: number) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!user || !userId) {
    throw new Error("unauthorized");
  }

  const currentUserProgress = await getUserProgress();
  if (!currentUserProgress) {
    throw new Error("user progress not found");
  }

  const exercise = await db.query.exercises.findFirst({
    where: eq(exercises.exerciseId, exerciseId),
  });
  if (!exercise || !exercise.lessonId) {
    throw new Error("exercise not found");
  }
  const lesson = await db.query.lessons.findFirst({
    where: eq(lessons.id, exercise.lessonId),
  });

  const lessonTitle = lesson?.title;

  exercise.lessonId;
  const existingExerciseProgress = await db.query.exerciseProgress.findFirst({
    where: and(
      eq(exerciseProgress.userId, userId),
      eq(exerciseProgress.exerciseId, exerciseId)
    ),
  });

  const hasProgress = !!existingExerciseProgress;

  if (hasProgress) {
    await db
      .update(exerciseProgress)
      .set({
        completed: true,
      })
      .where(eq(exerciseProgress.id, existingExerciseProgress.id));
    return;

    //TODO: revalidte the exercises page if there is any progress
  }

  await db.insert(exerciseProgress).values({
    exerciseId,
    userId,
    completed: true,
  });

  revalidatePath(`/learn/${lessonTitle}`);
  revalidatePath(`/learn/${lessonTitle}/exercises`);
};
