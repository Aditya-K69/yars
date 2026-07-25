import { auth } from "@clerk/nextjs/server";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { SourceSidebar } from "@/components/chat/notebook-sidebar";
import { ChatInput } from "@/components/chat/chat-input";
import { NotebookBar } from "@/components/chat/notebook-bar";
import { notFound } from "next/navigation";
import { getNotebookById } from "@/lib/notebooks";
import { getUserNotebooks } from "@/lib/notebooks";

type Props = {
  params: Promise<{
    notebookId: string;
  }>;
};

export default async function ChatPage({ params }: Props) {
  const { notebookId } = await params;

  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const notebook = await getNotebookById(notebookId, userId);

  if (!notebook) {
    notFound();
  }

  const notebooks = await getUserNotebooks(userId);

  return (
    <SidebarProvider>
      <SourceSidebar />

      <SidebarInset>
        <div className="flex h-screen flex-col bg-background">
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto flex h-full w-full max-w-3xl flex-col items-center justify-center px-6">
              <div className="space-y-3 text-center">
                <h1 className="text-3xl font-semibold tracking-tight">
                  {notebook.title}
                </h1>

                <p className="text-muted-foreground">
                  Add sources on the left, choose a notebook below, and start
                  asking questions.
                </p>
              </div>
            </div>
          </main>

          <ChatInput />
          <NotebookBar notebooks={notebooks} activeNotebookId={notebook.id} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
