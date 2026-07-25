"use client";

import { Message } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

import { ChatInput } from "@/components/chat/chat-input";
import { Message as ChatMessageBubble } from "@/components/chat/message";

type ChatMessage = Message & {
  thinking?: boolean;
};

type ChatProps = {
  notebook: {
    id: string;
    title: string;
  };

  initialMessages: Message[];
};

export function Chat({ notebook, initialMessages }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function handleSend() {
    const content = input.trim();

    if (!content || isLoading) {
      return;
    }

    setIsLoading(true);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "USER",
      content,
      conversationId: "",
      createdAt: new Date(),
    };

    const thinkingId = crypto.randomUUID();

    const thinkingMessage: ChatMessage = {
      id: thinkingId,
      role: "ASSISTANT",
      content: "",
      conversationId: "",
      createdAt: new Date(),
      thinking: true,
    };

    setMessages((prev) => [...prev, userMessage, thinkingMessage]);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notebookId: notebook.id,
          message: content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      setMessages((prev) =>
        prev.map((message) =>
          message.id === thinkingId
            ? {
                ...message,
                thinking: false,
                content: data.message,
              }
            : message,
        ),
      );
    } catch (error) {
      console.error(error);

      setMessages((prev) =>
        prev.map((message) =>
          message.id === thinkingId
            ? {
                ...message,
                thinking: false,
                content: "Something went wrong.",
              }
            : message,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto flex h-full w-full max-w-3xl flex-col px-6 py-8">
          {messages.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight">
                  {notebook.title}
                </h1>

                <p className="text-muted-foreground">
                  Add sources on the left, choose a notebook below, and start
                  asking questions.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <ChatMessageBubble
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  thinking={message.thinking}
                />
              ))}

              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </main>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
        disabled={isLoading}
      />
    </>
  );
}
