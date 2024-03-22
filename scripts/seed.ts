import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/Schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    await db.delete(schema.userProgress);
    await db.delete(schema.courses);
    await db.delete(schema.lessons);
    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "deutsch",
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
        title: "about german conjuktive",
        content: "here is the content",
        introduction: "this is the intro",
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
        comments: ["hallo how are you", "iam fine thankyou!"],
        order: 1,
      },
    ]);
  } catch (error) {
    console.log(error);
    throw new Error("failed to seed to database");
  }
};
main();
