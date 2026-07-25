import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const notebooks = await db.notebook.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return NextResponse.json(notebooks);
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title } = await req.json();

  const notebook = await db.notebook.create({
    data: {
      title,
      userId,
    },
  });

  return NextResponse.json(notebook, { status: 201 });
}
