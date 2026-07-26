import { SourceStatus, SourceType } from "@prisma/client";

import { db } from "@/lib/db";

export async function getNotebookSources(notebookId: string, userId: string) {
  return db.source.findMany({
    where: {
      notebookId,
      notebook: {
        userId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createTextSource(
  notebookId: string,
  title: string,
  content: string,
) {
  return db.source.create({
    data: {
      notebookId,
      title,
      content,
      type: SourceType.TEXT,
      status: SourceStatus.PENDING,
    },
  });
}
