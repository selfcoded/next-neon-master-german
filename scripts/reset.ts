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
    await db.delete(schema.videoScript);
    await db.delete(schema.vocalbularies);
    await db.delete(schema.partOfSpeechs);
    await db.delete(schema.exerciseProgress);
    await db.delete(schema.exercisesOptions);
  } catch (error) {
    console.log(error);
    throw new Error("failed to seed to database");
  }
};
main();
