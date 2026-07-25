import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { MessageRole } from "@prisma/client";

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
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const conversation = await getOrCreateConversation(notebook.id);

  await createMessage(conversation.id, MessageRole.USER, message);

  const messages = await getConversationMessages(conversation.id);

  const history = messages.map((message) => ({
    role: message.role === MessageRole.USER ? "user" : "assistant",
    content: message.content,
  }));

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: history,
  });

  const assistantReply = response.output_text;

  await createMessage(conversation.id, MessageRole.ASSISTANT, assistantReply);

  return NextResponse.json({
    message: assistantReply,
  });
}
