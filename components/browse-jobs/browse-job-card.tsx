import {
  Banknote,
  Bookmark,
  Clock3,
  Layers3,
  MapPin,
  Star,
} from "lucide-react";
import Link from "next/link";
import type { JobListing } from "@/lib/queries/jobs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function formatSalary(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 0,
  }).format(value);
}

function getSalary(job: JobListing) {
  if (job.minSalary === null && job.maxSalary === null) {
    return "Salary not listed";
  }

  const min =
    job.minSalary === null ? null : formatSalary(job.minSalary, job.currency);
  const max =
    job.maxSalary === null ? null : formatSalary(job.maxSalary, job.currency);

  return [min, max].filter(Boolean).join(" - ");
}

export function BrowseJobCard({ job }: { job: JobListing }) {
  const location = [job.location, job.isRemote ? "Remote" : null]
    .filter(Boolean)
    .join(" • ");
  const initials = job.companyName
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="rounded-xl border border-border bg-card p-5 sm:min-h-[181px] sm:p-6">
      <div className="flex items-start gap-4">
        <div
          aria-hidden="true"
          className="grid size-14 shrink-0 place-items-center rounded-lg border border-border bg-muted font-heading text-lg font-bold text-muted-foreground"
        >
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold tracking-tight sm:text-xl">
                <Link
                  href={`/browse-jobs/${encodeURIComponent(job.id)}`}
                  className="rounded-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {job.title}
                </Link>
              </h2>
              <p className="mt-1 truncate text-sm font-medium text-muted-foreground sm:text-base">
                {job.companyName}
                {location && (
                  <>
                    <span aria-hidden="true"> • </span>
                    <MapPin aria-hidden="true" className="mr-1 inline size-3.5" />
                    {location}
                  </>
                )}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Save ${job.title}`}
              className="-mr-2 -mt-2 shrink-0 text-muted-foreground"
            >
              <Bookmark aria-hidden="true" className="size-5" />
            </Button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="gap-1.5 rounded-md px-2.5 py-1 font-normal">
              <Banknote aria-hidden="true" className="size-3.5" />
              {getSalary(job)}
              {job.frequency && ` / ${job.frequency.replace("per ", "")}`}
            </Badge>
            <Badge variant="outline" className="gap-1.5 rounded-md px-2.5 py-1 font-normal">
              {job.jobType === "Hybrid" ? (
                <Layers3 aria-hidden="true" className="size-3.5" />
              ) : job.jobType === "Senior" ? (
                <Star aria-hidden="true" className="size-3.5" />
              ) : (
                <Clock3 aria-hidden="true" className="size-3.5" />
              )}
              {job.jobType}
            </Badge>
          </div>
        </div>
      </div>
    </article>
  );
}
