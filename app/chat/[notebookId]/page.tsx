import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

import { SourceSidebar } from "@/components/chat/notebook-sidebar";
import { NotebookBar } from "@/components/chat/notebook-bar";
import { Chat } from "@/components/chat/chat";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { getNotebookById, getUserNotebooks } from "@/lib/notebooks";
import { getConversationMessages, getOrCreateConversation } from "@/lib/chat";
import { getNotebookSources } from "@/lib/sources";

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

  const conversation = await getOrCreateConversation(notebook.id);

  const messages = await getConversationMessages(conversation.id);
  const sources = await getNotebookSources(notebook.id, userId);

  return (
    <SidebarProvider>
      <SourceSidebar notebookId={notebook.id} sources={sources} />

      <SidebarInset>
        <div className="flex h-screen flex-col bg-background">
          <Chat notebook={notebook} initialMessages={messages} />

          <NotebookBar notebooks={notebooks} activeNotebookId={notebook.id} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
