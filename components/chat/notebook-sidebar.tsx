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
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileText,
  Globe,
  ImageIcon,
  Plus,
  Video,
  MoreHorizontal,
} from "lucide-react";

const sources = [
  {
    name: "attention.pdf",
    icon: FileText,
  },
  {
    name: "openai.com/docs",
    icon: Globe,
  },
  {
    name: "karpathy-lecture.mp4",
    icon: Video,
  },
  {
    name: "rag-paper.pdf",
    icon: FileText,
  },
  {
    name: "architecture.png",
    icon: ImageIcon,
  },
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
                {sources.map((source) => {
                  const Icon = source.icon;

                  return (
                    <SidebarMenuItem key={source.name}>
                      <SidebarMenuButton
                        isActive={source.name === "attention.pdf"}
                        className="rounded-md"
                      >
                        <Icon className="h-4 w-4 shrink-0" />

                        <span className="truncate">{source.name}</span>
                      </SidebarMenuButton>

                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <SidebarMenuAction showOnHover>
                            <MoreHorizontal className="h-4 w-4" />
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Re-index</DropdownMenuItem>
                          <DropdownMenuItem variant="destructive">
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  );
                })}
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
