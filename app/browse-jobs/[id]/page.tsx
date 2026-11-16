import Link from "next/link";
import { Suspense } from "react";
import { io } from "next/cache";
import {
  ArrowLeft,
  Banknote,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";
import { ApplyNowButton } from "@/components/browse-jobs/apply-now-button";
import { Navbar } from "@/components/navbar/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { checkSeekerApplication } from "@/lib/queries/applications";
import { getBrowseJobById } from "@/lib/queries/jobs";
import {
  formatCompensation,
  formatDate,
  formatJobLocation,
} from "@/lib/utils/job-formatters";

function JobMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Banknote;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-card p-5">
      <Icon aria-hidden="true" className="size-5 text-muted-foreground" />
      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-semibold sm:text-base">
        {value}
      </p>
    </div>
  );
}

function DetailsSection({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
        {content || "No details provided."}
      </p>
    </section>
  );
}

async function JobDetailsContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await io();
  const { job, error } = await getBrowseJobById(id);

  if (!job) {
    return (
      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <p role="alert" className="text-sm text-destructive">
          {error ?? "Job not found."}
        </p>
        <Link
          href="/browse-jobs"
          className="mt-5 inline-flex h-9 items-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to jobs
        </Link>
      </section>
    );
  }

  const applicationStatus = await checkSeekerApplication(job.id);
  const companyInitials = job.companyName
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-6">
      <Link
        href="/browse-jobs"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to jobs
      </Link>

      <header className="rounded-2xl border border-border bg-card p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="grid size-16 shrink-0 place-items-center rounded-xl border border-border bg-muted font-heading text-xl font-bold text-muted-foreground sm:size-20">
            {companyInitials}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {job.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-base font-medium text-muted-foreground sm:text-lg">
              <span>{job.companyName}</span>
              <span aria-hidden="true">•</span>
              <span>{job.category}</span>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Save job"
              className="size-11"
            >
              <Bookmark aria-hidden="true" className="size-5" />
            </Button>
            <ApplyNowButton
              jobId={job.id}
              returnTo={`/browse-jobs/${encodeURIComponent(job.id)}`}
              hasApplied={applicationStatus.hasApplied}
              statusError={applicationStatus.error}
            />
          </div>
        </div>
      </header>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(300px,0.95fr)]">
        <div className="space-y-5">
          <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            <JobMetric
              icon={Banknote}
              label="Salary range"
              value={formatCompensation(job)}
            />
            <JobMetric
              icon={MapPin}
              label="Location"
              value={formatJobLocation(job)}
            />
            <JobMetric icon={Clock3} label="Job type" value={job.jobType} />
            <JobMetric
              icon={BriefcaseBusiness}
              label="Category"
              value={job.category}
            />
          </section>

          <article className="rounded-2xl border border-border bg-card p-5 sm:p-8">
            <DetailsSection
              title="Responsibilities"
              content={job.responsibilities}
            />
            <Separator className="my-6" />
            <DetailsSection title="Requirements" content={job.qualifications} />
            <Separator className="my-6" />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium">Application deadline</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatDate(job.deadline)}
                </p>
              </div>
              <Badge
                variant="outline"
                className="gap-1.5 rounded-md px-3 py-1.5"
              >
                <CalendarDays aria-hidden="true" className="size-4" />
                {job.status}
              </Badge>
            </div>
          </article>
        </div>

        <aside className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Company Overview
          </h2>
          <div className="mt-5 grid h-44 place-items-center overflow-hidden rounded-xl border border-border bg-[url('/images/cta-bg.png')] bg-cover bg-center">
            <div className="grid size-16 place-items-center rounded-2xl border border-white/10 bg-background/75 text-primary shadow-lg backdrop-blur">
              <Building2 aria-hidden="true" className="size-8" />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-muted font-semibold text-muted-foreground">
              {companyInitials}
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold">{job.companyName}</p>
              <p className="truncate text-sm text-muted-foreground">
                {job.category}
              </p>
            </div>
          </div>

          <Separator className="my-5" />
          <dl className="space-y-4">
            <div className="flex items-center justify-between gap-4 text-sm">
              <dt className="text-muted-foreground">Job location</dt>
              <dd className="text-right font-medium">
                {formatJobLocation(job)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 text-sm">
              <dt className="text-muted-foreground">Employment type</dt>
              <dd className="text-right font-medium">{job.jobType}</dd>
            </div>
          </dl>
          <Separator className="my-5" />
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <Building2 aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <p>
              {job.companyName} is hiring for {job.category} roles.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function BrowseJobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="animate-pulse rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
              Loading job details…
            </div>
          }
        >
          <JobDetailsContent params={params} />
        </Suspense>
      </div>
    </main>
  );
}
