"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { deleteJob } from "@/lib/actions/jobs";

export function DeleteJobButton({
  jobId,
  title,
}: {
  jobId: string;
  title: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) return;

    startTransition(async () => {
      const result = await deleteJob(jobId);
      toast.add({
        title: result.success ? "Job deleted" : "Could not delete job",
        description: result.message,
        type: result.success ? "success" : "error",
      });
    });
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      disabled={isPending}
      aria-label={`Delete ${title}`}
      title={`Delete ${title}`}
      onClick={handleDelete}
      className="size-9 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
    >
      <Trash2 className="size-4" aria-hidden="true" />
    </Button>
  );
}
