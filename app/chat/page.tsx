"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { SourceSidebar } from "@/components/chat/notebook-sidebar";
import { ChatInput } from "@/components/chat/chat-input";
import { NotebookBar } from "@/components/chat/notebook-bar";

export default function ChatPage() {
  return (
    <SidebarProvider>
      <SourceSidebar />

      <SidebarInset>
        <div className="flex h-screen flex-col bg-background">
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-3xl px-6 py-8">
              {/* Messages will go here */}
            </div>
          </main>

          <ChatInput />
          <NotebookBar />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
