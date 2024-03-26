"use server";

import {
  comments,
  partOfSpeechs,
  userProgress,
  vocalbularies,
} from "@/db/Schema";
import db from "@/db/drizzle";
import {
  getCourseById,
  getLesson,
  getPartOfSpeechs,
  getUserProgress,
  getVocalbularies,
} from "@/db/queries";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type Props = {
  vocalbulary: string;
  meaning: string;
  usage: string;
  partOfSpeechId: number;
};

export const upsertVocalbularies = async ({
  vocalbulary,
  meaning,
  usage,
  partOfSpeechId,
}: Props) => {
  console.log("enter server");
  const { userId } = await auth();

  if (!userId) return;

  if (vocalbulary === "" || meaning === "" || usage === "") return;
  const meaningArray =
    meaning.indexOf(",") !== -1 ? meaning.split(",") : [meaning];
  const usageArray = usage.indexOf(",") !== -1 ? usage.split(",") : [usage];
  await db.insert(vocalbularies).values({
    userId: userId,
    vocalbulary,
    meaning: meaningArray,
    usage: usageArray,
    partOfSpeechId: partOfSpeechId,
  });

  revalidatePath(`/vocabulary`);
};

export const getQueryVocalbularies = async (query: string) => {
  const vocalbularies = await getVocalbularies();
  let queriedVocalbulary = null;

  if (!vocalbularies) {
    return queriedVocalbulary;
  }
  vocalbularies.forEach((vocalbulary, index) => {
    if (vocalbulary.vocalbulary === query) {
      return (queriedVocalbulary = vocalbulary);
    }
  });
  return queriedVocalbulary;
};
