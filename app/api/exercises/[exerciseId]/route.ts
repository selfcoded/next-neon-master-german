import { exercises } from "@/db/Schema";
import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { exerciseId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  const data = await db.query.exercises.findFirst({
    where: eq(exercises.id, params.exerciseId),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: { exerciseId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse("unauthorized", { status: 401 });
  }
  const body = await req.json();
  const data = await db
    .update(exercises)
    .set({
      ...body,
    })
    .where(eq(exercises.id, params.exerciseId))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: { exerciseId: number } }
) => {
  const data = await db
    .delete(exercises)
    .where(eq(exercises.id, params.exerciseId))
    .returning();

  return NextResponse.json(data[0]);
};
