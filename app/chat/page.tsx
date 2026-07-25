import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { getUserNotebooks } from "@/lib/notebooks";

export default async function ChatPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const notebooks = await getUserNotebooks(userId);

  if (notebooks.length === 0) {
    redirect("/");
  }

  redirect(`/chat/${notebooks[0].id}`);
}
