import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { exercises } from "@/db/Schema";

export const GET = async () => {
  if (!isAdmin()) {
    return new NextResponse("unauthorized", { status: 401 });
  }
  const data = await db.query.exercises.findMany();
  return NextResponse.json(data, {
    headers: { "Content-Range": `exercises 0-${data.length}/${data.length}` },
  });
};

export const POST = async (req: Request) => {
  if (!isAdmin()) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  const body = await req.json();
  const data = await db
    .insert(exercises)
    .values({
      ...body,
    })
    .returning();

  return NextResponse.json(data[0]);
};
