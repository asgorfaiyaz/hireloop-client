import { ChevronLeft, ChevronRight } from "lucide-react";
import type { JobListing } from "@/lib/queries/jobs";
import { BrowseJobCard } from "@/components/browse-jobs/browse-job-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function BrowseJobList({ jobs }: { jobs: JobListing[] }) {
  return (
    <section aria-labelledby="job-results-heading" className="min-w-0">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1
          id="job-results-heading"
          className="text-xl font-semibold tracking-tight sm:text-2xl"
        >
          Found {jobs.length.toLocaleString()} Professional Jobs
        </h1>
        <label className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>Sort by:</span>
          <select
            aria-label="Sort jobs"
            defaultValue="recent"
            className="h-9 rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="recent">Most Recent</option>
            <option value="relevant">Most Relevant</option>
          </select>
        </label>
      </div>

      <div className="space-y-3">
        {jobs.length ? (
          jobs.map((job) => <BrowseJobCard key={job.id} job={job} />)
        ) : (
          <div className="rounded-xl border border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
            No jobs to display.
          </div>
        )}
      </div>

      <nav aria-label="Job result pages" className="mt-10 flex justify-center">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous page"
            disabled
          >
            <ChevronLeft aria-hidden="true" className="size-4" />
          </Button>
          <Button aria-current="page" className="size-9 px-0">
            1
          </Button>
          <Button variant="outline" className="size-9 px-0">
            2
          </Button>
          <Button variant="outline" className="size-9 px-0">
            3
          </Button>
          <span className="px-2 text-sm text-muted-foreground">…</span>
          <Button variant="outline" className="size-9 px-0">
            42
          </Button>
          <Button variant="outline" size="icon" aria-label="Next page">
            <ChevronRight aria-hidden="true" className="size-4" />
          </Button>
        </div>
      </nav>
    </section>
  );
}

export function BrowseJobListSkeleton() {
  return (
    <section aria-label="Loading jobs" className="min-w-0 space-y-3">
      <Skeleton className="mb-5 h-9 w-64" />
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          className="flex min-h-45 items-start gap-4 rounded-xl border border-border bg-card p-5 sm:p-6"
        >
          <Skeleton className="size-14 shrink-0 rounded-lg" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="mt-6 h-8 w-48" />
          </div>
        </div>
      ))}
    </section>
  );
}
