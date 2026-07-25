"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const notebooks = ["Research", "RAG", "AI", "Algorithms", "Next.js"];

export function NotebookBar() {
  return (
    <div className="sticky bottom-0 z-10 bg-background/80 backdrop-blur-xl pt-2 supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-3 px-5 py-3">
        <ScrollArea className="flex-1 whitespace-nowrap">
          <div className="flex gap-2">
            {notebooks.map((notebook) => (
              <Button
                key={notebook}
                variant={notebook === "Research" ? "secondary" : "ghost"}
                size="default"
                className="h-10 rounded-xl px-5"
              >
                {notebook}
              </Button>
            ))}

            <Button variant="ghost" size="icon" className="rounded-lg">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-8 w-8",
            },
          }}
        />
      </div>
    </div>
  );
}
