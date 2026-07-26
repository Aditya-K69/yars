import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(req: Request, { params }: Params) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { title } = await req.json();

  const notebook = await db.notebook.update({
    where: {
      id,
      userId,
    },
    data: {
      title,
    },
  });

  return NextResponse.json(notebook);
}

export async function DELETE(_req: Request, { params }: Params) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await db.notebook.delete({
    where: {
      id,
      userId,
    },
  });

  return NextResponse.json({ success: true });
}
