import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { MessageRole } from "@prisma/client";
import { streamText, type ModelMessage } from "ai";

import { openai } from "@/lib/openai";
import { getNotebookById } from "@/lib/notebooks";
import {
  createMessage,
  getConversationMessages,
  getOrCreateConversation,
} from "@/lib/chat";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { notebookId, message } = await req.json();

  const notebook = await getNotebookById(notebookId, userId);

  if (!notebook) {
    return NextResponse.json({ error: "Notebook not found" }, { status: 404 });
  }

  const conversation = await getOrCreateConversation(notebook.id);

  await createMessage(conversation.id, MessageRole.USER, message);

  const history = await getConversationMessages(conversation.id);

  const messages: ModelMessage[] = history.map((m) => ({
    role: m.role === MessageRole.USER ? "user" : "assistant",
    content: m.content,
  }));

  const result = streamText({
    model: openai("gpt-4.1-mini"),
    messages,

    async onFinish({ text }) {
      await createMessage(conversation.id, MessageRole.ASSISTANT, text);
    },
  });

  return result.toTextStreamResponse();
}
