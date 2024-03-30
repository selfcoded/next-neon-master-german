import { courses, lessons } from "@/db/Schema";
import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { lessonId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, params.lessonId),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: { lessonId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse("unauthorized", { status: 401 });
  }
  const body = await req.json();
  const data = await db
    .update(lessons)
    .set({
      ...body,
    })
    .where(eq(lessons.id, params.lessonId))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: { lessonId: number } }
) => {
  const data = await db
    .delete(lessons)
    .where(eq(lessons.id, params.lessonId))
    .returning();

  return NextResponse.json(data[0]);
};
