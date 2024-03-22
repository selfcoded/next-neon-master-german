import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

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
}));

export const comments = pgTable("comments", {
  userId: text("user_id").primaryKey(),
  username: text("username").notNull().default("User"),
  userImageSrc: text("user_image_src").notNull().default("/unknown"),
  comments: text("comments").array().notNull(),
  lessonId: integer("lesson_id").references(() => lessons.id, {
    onDelete: "cascade",
  }),
  order: integer("order").notNull(),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  lessons: one(lessons, {
    fields: [comments.userId],
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
  userImageSrc: text("user_image_src").notNull().default("/unknown"),
  activeCourseID: integer("active_course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseID],
    references: [courses.id],
  }),
}));
