import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import {
  comments,
  courses,
  exerciseProgress,
  exercises,
  exercisesOptions,
  lessons,
  userProgress,
} from "./Schema";

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();
  return data;
});

export const getUserProgress = cache(async () => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }
  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });
  return data;
});

export const getCourseById = cache(async (courseID: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseID),
    //TODO: populate the data from this user id
  });

  return data;
});

export const getLessons = cache(async (course_id: number) => {
  const lessonss = await db.query.lessons.findMany({
    where: eq(lessons.courseId, course_id),
  });

  return lessonss;
});
export const getLessonsCopy = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();
  if (!userId || !userProgress || !userProgress.activeCourseId) return null;
  const lessonss = await db.query.lessons.findMany({
    where: eq(lessons.courseId, userProgress.activeCourseId),
    with: {
      comments: true,
      exercises: {
        with: {
          exerciseProgress: {
            where: eq(exerciseProgress.userId, userId),
          },
          exercisesOptions: true,
        },
      },
    },
  });
  const normalizedData = lessonss.map((lesson) => {
    const allCompletedExercises = lesson.exercises.every((exercise) => {
      return (
        exercise.exerciseProgress &&
        exercise.exerciseProgress.length > 0 &&
        exercise.exerciseProgress.every((progress) => progress.completed)
      );
    });
    return { ...lesson, completed: allCompletedExercises };
  });
  return normalizedData;
});

export const getLesson = cache(async (title: string) => {
  const data = await db.query.lessons.findFirst({
    where: eq(lessons.title, title),
  });

  return data;
});

export const getComments = cache(async (lesson_id: number) => {
  const data = await db.query.comments.findMany({
    where: eq(comments.lessonId, lesson_id),
  });

  return data;
});

export const getExercises = cache(async (lesson_id: number) => {
  const data = await db.query.exercises.findMany({
    where: eq(exercises.lessonId, lesson_id),
  });
  return data;
});
export const getExerciseOptions = cache(async (exercise_id: number) => {
  const data = await db.query.exercisesOptions.findMany({
    where: eq(exercisesOptions.exerciseId, exercise_id),
  });
  return data;
});
