"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  ArrowDownTrayIcon,
  DocumentDuplicateIcon,
  ArrowRightCircleIcon,
  TrashIcon,
  EyeIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { FileItemData } from "./FileItem";

interface FileItemMenuProps {
  file: FileItemData;
  onRename?: (file: FileItemData) => void;
  onDownload?: (file: FileItemData) => void;
  onCopy?: (file: FileItemData) => void;
  onMove?: (file: FileItemData) => void;
  onDelete?: (file: FileItemData) => void;
  onPreview?: (file: FileItemData) => void;
  onShare?: (file: FileItemData) => void;
  position?: "top-right" | "right";
}

export default function FileItemMenu({
  file,
  onRename,
  onDownload,
  onCopy,
  onMove,
  onDelete,
  onPreview,
  onShare,
  position = "right",
}: FileItemMenuProps) {
  const run = (action: ((file: FileItemData) => void) | undefined) => {
    action?.(file);
  };

  const menu = (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="More options"
            className={position === "top-right" ? "bg-white/90 hover:bg-white shadow-sm" : ""}
            onClick={(e) => e.stopPropagation()}
          />
        }
      >
        <EllipsisVerticalIcon className="h-4 w-4 sm:h-5 sm:w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side={position === "top-right" ? "bottom" : "bottom"}
        className="min-w-48 w-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {file.type === "file" && (
          <DropdownMenuItem onClick={() => run(onPreview)}>
            <EyeIcon />
            Preview
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => run(onRename)}>
          <PencilIcon />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => run(onDownload)}>
          <ArrowDownTrayIcon />
          Download
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => run(onCopy)}>
          <DocumentDuplicateIcon />
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => run(onShare)}>
          <ShareIcon />
          Share
        </DropdownMenuItem>
        {file.type === "file" && (
          <DropdownMenuItem onClick={() => run(onMove)}>
            <ArrowRightCircleIcon />
            Move
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => run(onDelete)}>
          <TrashIcon />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (position === "top-right") {
    return <div className="absolute top-2 right-2 z-10">{menu}</div>;
  }

  return <div className="relative shrink-0">{menu}</div>;
}
