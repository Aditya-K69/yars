"use client";

import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export function ChatInput() {
  return (
    <div className="sticky bottom-0 z-10 bg-background px-6 pb-6 pt-2">
      <div className="mx-auto flex w-full max-w-3xl items-center gap-3 rounded-full border bg-card px-5 py-3 shadow-lg">
        <textarea
          rows={1}
          placeholder="Ask anything..."
          className="flex-1 resize-none bg-transparent text-base outline-none placeholder:text-muted-foreground"
        />

        <Button size="icon" className="h-10 w-10 rounded-full shrink-0">
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
