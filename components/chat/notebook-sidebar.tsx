"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";

const sources = [
  "attention.pdf",
  "openai-docs",
  "karpathy-lecture.mp4",
  "rag-paper.pdf",
  "architecture.png",
];

export function SourceSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex justify-center py-4">
        <SidebarTrigger className="h-9 w-9 rounded-md" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 pb-3 text-xs uppercase tracking-wide group-data-[collapsible=icon]:hidden">
            Your Sources
          </SidebarGroupLabel>

          <SidebarGroupContent className="group-data-[collapsible=icon]:hidden">
            <ScrollArea className="h-full px-2">
              <SidebarMenu className="space-y-1">
                {sources.map((source) => (
                  <SidebarMenuItem key={source}>
                    <SidebarMenuButton
                      isActive={source === "attention.pdf"}
                      className="rounded-xl"
                    >
                      <span>{source}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2 pb-3">
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
      </SidebarFooter>
    </Sidebar>
  );
}
