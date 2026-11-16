import { Suspense } from "react";
import { io } from "next/cache";
import { Navbar } from "@/components/navbar/navbar";
import {
  BrowseJobFilters,
  BrowseJobFiltersFallback,
} from "@/components/browse-jobs/browse-job-filters";
import {
  BrowseJobList,
  BrowseJobListSkeleton,
} from "@/components/browse-jobs/browse-job-list";
import {
  BrowseJobsSearch,
  BrowseJobsSearchFallback,
} from "@/components/browse-jobs/browse-jobs-search";
import { getBrowseJobs } from "@/lib/queries/jobs";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

async function BrowseJobResults({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(await searchParams)) {
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
    } else if (value !== undefined) {
      params.set(key, value);
    }
  }

  const query = params.toString();
  await io();
  const { jobs } = await getBrowseJobs(query);
  return <BrowseJobList jobs={jobs} />;
}

export default function BrowseJobsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-5 sm:px-6 lg:px-8">
        <Suspense fallback={<BrowseJobsSearchFallback />}>
          <BrowseJobsSearch />
        </Suspense>

        <div className="mt-6 grid gap-6 lg:grid-cols-[296px_minmax(0,1fr)]">
          <Suspense fallback={<BrowseJobFiltersFallback />}>
            <BrowseJobFilters />
          </Suspense>
          <Suspense fallback={<BrowseJobListSkeleton />}>
            <BrowseJobResults searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
