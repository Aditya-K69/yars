import { db } from "@/lib/db";

export async function getUserNotebooks(userId: string) {
  return db.notebook.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function createNotebook(userId: string, title: string) {
  return db.notebook.create({
    data: {
      userId,
      title,
    },
  });
}

export async function getNotebookById(notebookId: string, userId: string) {
  return db.notebook.findFirst({
    where: {
      id: notebookId,
      userId,
    },
  });
}
