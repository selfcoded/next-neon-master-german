import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { lessons } from "@/db/Schema";

export const GET = async () => {
  if (!isAdmin()) {
    return new NextResponse("unauthorized", { status: 401 });
  }
  const data = await db.query.lessons.findMany();
  return NextResponse.json(data, {
    headers: { "Content-Range": `lessons 0-${data.length}/${data.length}` },
  });
};

export const POST = async (req: Request) => {
  if (!isAdmin()) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  const body = await req.json();
  const data = await db
    .insert(lessons)
    .values({
      ...body,
    })
    .returning();

  return NextResponse.json(data[0]);
};
