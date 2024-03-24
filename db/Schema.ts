import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  customType,
  json,
  timestamp,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(),
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  introduction: text("introduction").notNull(),
  courseId: integer("course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),
  order: integer("order").notNull(),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  activeLession: one(courses, {
    fields: [lessons.courseId],
    references: [courses.id],
  }),
  comments: many(comments),
  exercises: many(exercises),
}));

export const exerciseEnum = pgEnum("type", [
  "SINGLE_CHOICE",
  "GAP_FILLING",
  "MATCHING",
  "CLOZE",
  "TRUEFALSE",
  "TRANSFORMATION",
]);
export const exercises = pgTable("exercises", {
  exerciseId: serial("exercise_id").primaryKey(),
  lessonId: integer("lession_id").references(() => lessons.id, {
    onDelete: "cascade",
  }),
  type: exerciseEnum("type").notNull(),
  question: text("question").notNull(),
  order: integer("order").notNull(),
});

export const exercisesRelations = relations(exercises, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [exercises.lessonId],
    references: [lessons.id],
  }),
  exercisesOptions: many(exercisesOptions),
  exerciseProgress: many(exerciseProgress),
}));

export const exercisesOptions = pgTable("exercises_options", {
  exerciseOptionId: serial("exercise_option_id").primaryKey(),
  exerciseId: integer("exercise_id").references(() => exercises.exerciseId, {
    onDelete: "cascade",
  }),
  content: text("content").notNull(),
  isCorrent: boolean("is_corrent").notNull(),
});

export const exercisesOptionsRelations = relations(
  exercisesOptions,
  ({ one }) => ({
    exercise: one(exercises, {
      fields: [exercisesOptions.exerciseId],
      references: [exercises.exerciseId],
    }),
  })
);

export const exerciseProgress = pgTable("exercise_progress", {
  id: serial("exercise_progress_id").primaryKey(),
  userId: text("user_id").notNull(),
  exerciseId: integer("exercise_id").references(() => exercises.exerciseId, {
    onDelete: "cascade",
  }),
  completed: boolean("completed").notNull(),
});

export const exerciseProgressRelations = relations(
  exerciseProgress,
  ({ one }) => ({
    exercise: one(exercises, {
      fields: [exerciseProgress.exerciseId],
      references: [exercises.exerciseId],
    }),
  })
);

export const comments = pgTable("comments", {
  commentId: serial("comment_id").primaryKey(),
  userId: text("user_id").notNull(),
  username: text("username").notNull().default("User"),
  userImageSrc: text("user_image_src").notNull().default("/unknown.png"),
  comments: text("comments").notNull(),
  lessonId: integer("lesson_id").references(() => lessons.id, {
    onDelete: "cascade",
  }),
  createAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: false,
  }).notNull(),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  lesson: one(lessons, {
    fields: [comments.lessonId],
    references: [lessons.id],
  }),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
  lessons: many(lessons),
}));

export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  username: text("username").notNull().default("User"),
  userImageSrc: text("user_image_src").notNull().default("/unknown.png"),
  activeCourseId: integer("active_course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}));
