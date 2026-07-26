import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { getNotebookById } from "@/lib/notebooks";
import { createTextSource, getNotebookSources } from "@/lib/sources";

export async function GET(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);

  const notebookId = searchParams.get("notebookId");

  if (!notebookId) {
    return NextResponse.json(
      { error: "Notebook ID is required" },
      { status: 400 },
    );
  }

  const notebook = await getNotebookById(notebookId, userId);

  if (!notebook) {
    return NextResponse.json({ error: "Notebook not found" }, { status: 404 });
  }

  const sources = await getNotebookSources(notebookId, userId);

  return NextResponse.json(sources);
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { notebookId, title, content } = await req.json();

  if (!notebookId || !title || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const notebook = await getNotebookById(notebookId, userId);

  if (!notebook) {
    return NextResponse.json({ error: "Notebook not found" }, { status: 404 });
  }

  const source = await createTextSource(
    notebookId,
    title.trim(),
    content.trim(),
  );

  return NextResponse.json(source, { status: 201 });
}
