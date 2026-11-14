import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, BriefcaseBusiness, Globe2, MapPin, Pencil } from "lucide-react";
import { getJobById } from "@/lib/queries/jobs";
import { formatCompensation, formatDeadline, formatJobLocation } from "@/lib/utils/job-formatters";

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/60 p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium text-foreground">{value || "Not specified"}</p>
    </div>
  );
}

async function JobDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { job, error } = await getJobById(id);

  if (!job) {
    return (
      <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-8">
          <p role="alert" className="text-sm text-destructive">{error ?? "Job not found."}</p>
          <Link href="/dashboard/recruiter/jobs" className="mt-5 inline-flex items-center gap-2 text-sm text-primary hover:underline">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back to job listings
          </Link>
        </div>
      </main>
    );
  }

  const location = formatJobLocation(job);
  const compensation = formatCompensation(job);

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/dashboard/recruiter/jobs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back to job listings
          </Link>
          <Link href={`/dashboard/recruiter/jobs/${job.id}/edit`} className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Pencil className="size-4" aria-hidden="true" /> Edit Job
          </Link>
        </div>

        <header className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <BriefcaseBusiness className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm text-muted-foreground">{job.companyName}</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{job.title}</h1>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                {job.isRemote ? <Globe2 className="size-4" aria-hidden="true" /> : <MapPin className="size-4" aria-hidden="true" />}
                {location}
              </p>
            </div>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Detail label="Department" value={job.category} />
            <Detail label="Employment type" value={job.jobType} />
            <Detail label="Compensation" value={compensation} />
            <Detail label="Application deadline" value={formatDeadline(job.deadline)} />
          </div>
        </header>

        <section className="mt-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-lg font-semibold">Responsibilities</h2>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{job.responsibilities || "No responsibilities provided."}</p>
        </section>

        <section className="mt-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-lg font-semibold">Qualifications &amp; Requirements</h2>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{job.qualifications || "No qualifications provided."}</p>
        </section>
      </div>
    </main>
  );
}

export default function RecruiterJobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background px-4 py-10 text-muted-foreground sm:px-6">
          <div className="mx-auto max-w-4xl animate-pulse rounded-2xl border border-border bg-card p-8">
            Loading job details…
          </div>
        </main>
      }
    >
      <JobDetails params={params} />
    </Suspense>
  );
}
