"use client";

import { Message } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

import { ChatInput } from "@/components/chat/chat-input";
import { Message as ChatMessageBubble } from "@/components/chat/message";

type ChatMessage = Message;

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

    if (!content || isLoading) return;

    setInput("");
    setIsLoading(true);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "USER",
      content,
      conversationId: "",
      createdAt: new Date(),
    };

    const assistantId = crypto.randomUUID();

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        id: assistantId,
        role: "ASSISTANT",
        content: "",
        conversationId: "",
        createdAt: new Date(),
      },
    ]);

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

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        fullText += decoder.decode(value, { stream: true });

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: fullText,
                }
              : m,
          ),
        );
      }
    } catch (err) {
      console.error(err);

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content: "Something went wrong.",
              }
            : m,
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
