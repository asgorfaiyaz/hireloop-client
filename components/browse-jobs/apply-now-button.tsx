"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { createApplication } from "@/lib/actions/applications";

export function ApplyNowButton({
  jobId,
  returnTo,
  hasApplied,
  statusError,
}: {
  jobId: string;
  returnTo: string;
  hasApplied: boolean;
  statusError?: string;
}) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSubmitting, startTransition] = useTransition();

  function handleApply() {
    if (isPending || isSubmitting) return;

    if (!session) {
      const params = new URLSearchParams({ redirectTo: returnTo });
      router.push(`/sign-in?${params.toString()}`);
      return;
    }

    startTransition(async () => {
      const result = await createApplication(jobId);
      toast.add({
        title: result.success ? "Application submitted" : "Could not apply",
        description: result.message,
        type: result.success ? "success" : "error",
      });
      if (result.success) router.refresh();
    });
  }

  const disabled = isPending || isSubmitting || hasApplied || Boolean(statusError);

  return (
    <Button
      type="button"
      disabled={disabled}
      title={statusError}
      className="h-11 px-5 bg-foreground text-background hover:bg-foreground/90"
      onClick={handleApply}
    >
      {hasApplied
        ? "Applied"
        : statusError
          ? "Status unavailable"
          : isSubmitting
            ? "Submitting…"
            : "Apply Now"}
    </Button>
  );
}
