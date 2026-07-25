"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import { UserButton } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

type NotebookBarProps = {
  notebooks: {
    id: string;
    title: string;
  }[];

  activeNotebookId: string;
};

export function NotebookBar({ notebooks, activeNotebookId }: NotebookBarProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  async function createNotebook() {
    const notebookTitle = title.trim();

    if (!notebookTitle) return;

    const response = await fetch("/api/notebooks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: notebookTitle,
      }),
    });

    if (!response.ok) {
      console.error("Failed to create notebook");
      return;
    }

    setTitle("");
    setOpen(false);

    router.refresh();
  }

  return (
    <div className="sticky bottom-0 z-10 bg-background/80 pt-2 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-3 px-5 py-3">
        <ScrollArea className="flex-1 whitespace-nowrap">
          <div className="flex gap-2">
            {notebooks.map((notebook) => (
              <Link key={notebook.id} href={`/chat/${notebook.id}`}>
                <Button
                  variant={
                    notebook.id === activeNotebookId ? "secondary" : "ghost"
                  }
                  size="sm"
                  className="rounded-lg"
                >
                  {notebook.title}
                </Button>
              </Link>
            ))}

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-lg">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Notebook</DialogTitle>
                  <DialogDescription>
                    Give your notebook a name.
                  </DialogDescription>
                </DialogHeader>

                <Input
                  autoFocus
                  placeholder="e.g. AI Research"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      createNotebook();
                    }
                  }}
                />

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setOpen(false);
                      setTitle("");
                    }}
                  >
                    Cancel
                  </Button>

                  <Button onClick={createNotebook}>Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
