"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { FileItemData } from "./FileItem";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  file: FileItemData | null;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export default function DeleteConfirmDialog({
  isOpen,
  onClose,
  file,
  onConfirm,
  isDeleting = false,
}: DeleteConfirmDialogProps) {
  if (!file) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Delete {file.type === "folder" ? "Folder" : "File"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Confirm deletion of {file.name}
          </DialogDescription>
        </DialogHeader>
        <section className="py-2">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-2">
                Are you sure you want to delete{" "}
                <span className="font-medium">&quot;{file.name}&quot;</span>?
              </p>
              {file.type === "folder" && (
                <p className="text-sm text-gray-500">
                  This will permanently delete the folder and all its contents. This action cannot be undone.
                </p>
              )}
              {file.type === "file" && (
                <p className="text-sm text-gray-500">
                  This action cannot be undone.
                </p>
              )}
            </div>
          </div>
        </section>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            aria-busy={isDeleting}
          >
            {isDeleting && <Spinner />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
