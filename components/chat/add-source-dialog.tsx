"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type AddSourceDialogProps = {
  notebookId: string;
};

export function AddSourceDialog({ notebookId }: AddSourceDialogProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function createSource() {
    const sourceTitle = title.trim();
    const sourceContent = content.trim();

    if (!sourceTitle || !sourceContent) {
      return;
    }

    const response = await fetch("/api/sources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notebookId,
        title: sourceTitle,
        content: sourceContent,
      }),
    });

    if (!response.ok) {
      return;
    }

    setTitle("");
    setContent("");
    setOpen(false);

    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="
            w-full
            h-11
            justify-start
            rounded-lg

            group-data-[collapsible=icon]:w-9
            group-data-[collapsible=icon]:h-9
            group-data-[collapsible=icon]:mx-auto
            group-data-[collapsible=icon]:justify-center
            group-data-[collapsible=icon]:rounded-md
          "
        >
          <Plus className="h-4 w-4 shrink-0" />

          <span className="ml-2 group-data-[collapsible=icon]:hidden">
            Add Source
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Text Source</DialogTitle>

          <DialogDescription>
            Create a text source for this notebook.
          </DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="Paste your text..."
          className="min-h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
              setTitle("");
              setContent("");
            }}
          >
            Cancel
          </Button>

          <Button onClick={createSource}>Add Source</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
