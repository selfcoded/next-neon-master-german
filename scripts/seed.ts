import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/Schema";
import { datetime } from "drizzle-orm/mysql-core";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    await db.delete(schema.userProgress);
    await db.delete(schema.courses);
    await db.delete(schema.lessons);
    await db.delete(schema.comments);
    await db.delete(schema.exercises);
    await db.delete(schema.exerciseProgress);
    await db.delete(schema.exercisesOptions);
    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Grammatikübersicht",
        imageSrc: "/unknown.png",
      },
      {
        id: 2,
        title: "englisch",
        imageSrc: "/unknown.png",
      },
      {
        id: 3,
        title: "slovenian",
        imageSrc: "/unknown.png",
      },
      {
        id: 4,
        title: "dutch",
        imageSrc: "/unknown.png",
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        title: "Deklination",
        content:
          '<div class="flex flex-col text-slate-600"><h1>Fälle</h1><div><h2>Nominativ</h2><p>der Wer-Fall, bezieht sich auf das Subjekt: Der Mann geht über dieStraße.</p><h2>Genitiv</h2><p>der Wessen-Fall, bezieht sich meist auf ein präpositionales Objekt:Der Schirm des Mannes flog davon.</p></div></div>',
        introduction:
          "Unter „Deklination“ versteht man eine Veränderung der Form eines Wortes, die dazu dient, Kasus, Numerus und Genus auszudrücken. Ein Wort zu „deklinieren“ bedeutet, seine Deklinationsformen zu bilden. ",
        courseId: 1,
        order: 1,
      },
      {
        id: 2,
        title: "about english conjuktive",
        content: "here is the content",
        introduction: "this is the intro",
        courseId: 2,
        order: 1,
      },
    ]);
    await db.insert(schema.comments).values([
      {
        userId: "2",
        username: "hao",
        userImageSrc: "/unknown.png",
        lessonId: 1,
        comments: "this is the first comment from user 2",
        createAt: new Date(),
      },
    ]);
    await db.insert(schema.exercises).values([
      {
        exerciseId: 1,
        lessonId: 1,
        type: "SINGLE_CHOICE",
        question: "was ist der Nominativ von MANN",
        order: 1,
      },
    ]);
    await db.insert(schema.exercises).values([
      {
        exerciseId: 2,
        lessonId: 1,
        type: "SINGLE_CHOICE",
        question: "was ist der Nominativ von Frau",
        order: 2,
      },
    ]);
    await db.insert(schema.exercisesOptions).values([
      {
        exerciseOptionId: 1,
        exerciseId: 1,
        content: "der Mann",
        isCorrent: true,
      },
      {
        exerciseOptionId: 2,
        exerciseId: 1,
        content: "den Mann",
        isCorrent: false,
      },
      {
        exerciseOptionId: 3,
        exerciseId: 1,
        content: "die Mann",
        isCorrent: false,
      },
      {
        exerciseOptionId: 4,
        exerciseId: 1,
        content: "des Mann",
        isCorrent: false,
      },
    ]);
    await db.insert(schema.exercisesOptions).values([
      {
        exerciseOptionId: 5,
        exerciseId: 2,
        content: "der Frau",
        isCorrent: false,
      },
      {
        exerciseOptionId: 6,
        exerciseId: 2,
        content: "den Frau",
        isCorrent: false,
      },
      {
        exerciseOptionId: 7,
        exerciseId: 2,
        content: "die Frau",
        isCorrent: true,
      },
      {
        exerciseOptionId: 8,
        exerciseId: 2,
        content: "des Frau",
        isCorrent: false,
      },
    ]);

    // await db.insert(schema.exerciseProgress).values([
    //   {
    //     id: 1,
    //     userId: "2",
    //     exerciseId: 1,
    //     completed: false,
    //   },
    // ]);
  } catch (error) {
    console.log(error);
    throw new Error("failed to seed to database");
  }
};
main();
