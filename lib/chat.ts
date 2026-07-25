import { db } from "@/lib/db";
import { MessageRole } from "@prisma/client";

export async function getConversationMessages(conversationId: string) {
  return db.message.findMany({
    where: {
      conversationId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function createMessage(
  conversationId: string,
  role: MessageRole,
  content: string,
) {
  return db.message.create({
    data: {
      conversationId,
      role,
      content,
    },
  });
}
export async function getOrCreateConversation(notebookId: string) {
  const existing = await db.conversation.findFirst({
    where: {
      notebookId,
    },
  });

  if (existing) {
    return existing;
  }

  return db.conversation.create({
    data: {
      notebookId,
    },
  });
}
