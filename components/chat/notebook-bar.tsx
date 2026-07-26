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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { MoreHorizontal } from "lucide-react";

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
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedNotebook, setSelectedNotebook] = useState<
    NotebookBarProps["notebooks"][number] | null
  >(null);

  const [renameTitle, setRenameTitle] = useState("");

  async function renameNotebook() {
    if (!selectedNotebook) return;

    const notebookTitle = renameTitle.trim();

    if (!notebookTitle) return;

    const response = await fetch(`/api/notebooks/${selectedNotebook.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: notebookTitle,
      }),
    });

    if (!response.ok) return;

    setSelectedNotebook(null);
    setRenameTitle("");
    setRenameOpen(false);

    router.refresh();
  }
  async function deleteNotebook() {
    if (!selectedNotebook) return;

    const response = await fetch(`/api/notebooks/${selectedNotebook.id}`, {
      method: "DELETE",
    });

    if (!response.ok) return;

    setSelectedNotebook(null);
    setDeleteOpen(false);

    const remaining = notebooks.filter((n) => n.id !== selectedNotebook.id);

    if (remaining.length > 0) {
      router.push(`/chat/${remaining[0].id}`);
    } else {
      router.push("/chat");
    }

    router.refresh();
  }

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

    const notebook = await response.json();

    setTitle("");
    setOpen(false);

    router.push(`/chat/${notebook.id}`);
    router.refresh();
  }

  return (
    <div className="sticky bottom-0 z-10 bg-background/80 pt-2 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-3 px-5 py-3">
        <ScrollArea className="flex-1 whitespace-nowrap">
          <div className="flex gap-2">
            {notebooks.map((notebook) => (
              <div
                key={notebook.id}
                className="flex items-center rounded-lg border bg-background"
              >
                <Link href={`/chat/${notebook.id}`}>
                  <Button
                    variant={
                      notebook.id === activeNotebookId ? "secondary" : "ghost"
                    }
                    size="sm"
                    className="rounded-r-none border-0"
                  >
                    {notebook.title}
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-l-none"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedNotebook(notebook);
                        setRenameTitle(notebook.title);
                        setRenameOpen(true);
                      }}
                    >
                      Rename
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => {
                        setSelectedNotebook(notebook);
                        setDeleteOpen(true);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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
            <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Rename Notebook</DialogTitle>
                  <DialogDescription>
                    Enter a new notebook name.
                  </DialogDescription>
                </DialogHeader>

                <Input
                  autoFocus
                  value={renameTitle}
                  onChange={(e) => setRenameTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      renameNotebook();
                    }
                  }}
                />

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setRenameOpen(false);
                      setRenameTitle("");
                      setSelectedNotebook(null);
                    }}
                  >
                    Cancel
                  </Button>

                  <Button onClick={renameNotebook}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete notebook?</AlertDialogTitle>

                  <AlertDialogDescription>
                    This will permanently delete this notebook and all of its
                    messages. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => {
                      setDeleteOpen(false);
                      setSelectedNotebook(null);
                    }}
                  >
                    Cancel
                  </AlertDialogCancel>

                  <AlertDialogAction onClick={deleteNotebook}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
