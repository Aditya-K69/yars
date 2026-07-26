"use client";

import { SourceStatus, SourceType } from "@prisma/client";
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
import { AddSourceDialog } from "@/components/chat/add-source-dialog";

import { FileText, Globe, MoreHorizontal, Plus, Video } from "lucide-react";

type SourceSidebarProps = {
  notebookId: string;

  sources: {
    id: string;
    title: string;
    type: SourceType;
    status: SourceStatus;
  }[];
};
const sourceIcons = {
  PDF: FileText,
  TEXT: FileText,
  WEBSITE: Globe,
  YOUTUBE: Video,
  TRANSCRIPT: FileText,
};

export function SourceSidebar({ notebookId, sources }: SourceSidebarProps) {
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
                  const Icon = sourceIcons[source.type];

                  return (
                    <SidebarMenuItem key={source.id}>
                      <SidebarMenuButton
                        isActive={false}
                        className="rounded-md"
                      >
                        <Icon className="h-4 w-4 shrink-0" />

                        <span className="truncate">{source.title}</span>
                      </SidebarMenuButton>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
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
        <AddSourceDialog notebookId={notebookId} />
      </SidebarFooter>
    </Sidebar>
  );
}
