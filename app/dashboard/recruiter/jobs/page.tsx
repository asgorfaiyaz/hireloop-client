import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  Eye,
  Globe2,
  MapPin,
  Pencil,
  Plus,
  UsersRound,
} from "lucide-react";
import { DeleteJobButton } from "@/components/dashboard/DeleteJobButton";
import { buttonVariants } from "@/components/ui/button";
import { getJobs, type JobListing } from "@/lib/queries/jobs";
import { formatCompensation, formatDate, formatJobLocation, formatPostedAt } from "@/lib/utils/job-formatters";
export const instant = false;
function JobStatus({ status }: { status: JobListing["status"] }) {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1.5 text-xs font-medium text-success">
        <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
        Active
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
      <span
        className="size-1.5 rounded-full bg-muted-foreground/60"
        aria-hidden="true"
      />
      {status === "paused" ? "Paused" : "Expired"}
    </span>
  );
}

function JobRow({ job }: { job: JobListing }) {
  const location = formatJobLocation(job);

  return (
    <tr className="border-t border-border transition-colors hover:bg-muted/30">
      <td className="px-4 py-4 sm:px-5">
        <div className="flex min-w-[190px] items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <BriefcaseBusiness className="size-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <Link
              href={`/dashboard/recruiter/jobs/${job.id}`}
              className="truncate text-sm font-semibold text-foreground hover:text-primary hover:underline"
            >
              {job.title}
            </Link>
            <p className="mt-1 truncate text-xs text-muted-foreground">
              {job.category}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 sm:px-5">
        <div className="min-w-[170px]">
          <p className="truncate text-sm font-medium text-foreground">
            {job.companyName}
          </p>
          <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
            {job.isRemote ? (
              <Globe2 className="size-3.5 shrink-0" aria-hidden="true" />
            ) : (
              <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            )}
            <span className="truncate">{location}</span>
          </p>
        </div>
      </td>
      <td className="px-4 py-4 sm:px-5">
        <span className="whitespace-nowrap rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
          {job.jobType}
        </span>
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-foreground sm:px-5">
        {formatCompensation(job)}
      </td>
      <td className="px-4 py-4 sm:px-5">
        {job.applicantCount === null ? (
          <span className="whitespace-nowrap text-sm text-muted-foreground">
            —
          </span>
        ) : (
          <Link
            href="/dashboard/recruiter/applicants"
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-primary hover:underline"
          >
            <UsersRound className="size-4" aria-hidden="true" />
            {job.applicantCount}{" "}
            {job.applicantCount === 1 ? "Candidate" : "Candidates"}
          </Link>
        )}
      </td>
      <td className="px-4 py-4 sm:px-5">
        <JobStatus status={job.status} />
      </td>
      <td className="whitespace-nowrap px-4 py-4 sm:px-5">
        <p className="text-sm text-foreground">{formatDate(job.deadline)}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {formatPostedAt(job.createdAt)}
        </p>
      </td>
      <td className="px-4 py-4 sm:px-5">
        <div className="flex items-center gap-1.5">
          <Link
            href={`/dashboard/recruiter/jobs/${job.id}`}
            aria-label={`View ${job.title}`}
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "h-8 gap-1.5 rounded-lg px-2.5 text-xs",
            })}
          >
            <Eye className="size-3.5" aria-hidden="true" />
            View
          </Link>
          <Link
            href={`/dashboard/recruiter/jobs/${job.id}/edit`}
            aria-label={`Update ${job.title}`}
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "h-8 gap-1.5 rounded-lg bg-primary/10 px-2.5 text-xs text-primary hover:bg-primary/15",
            })}
          >
            <Pencil className="size-3.5" aria-hidden="true" />
            Update
          </Link>
          <DeleteJobButton jobId={job.id} title={job.title} />
        </div>
      </td>
    </tr>
  );
}

export default async function RecruiterDashboardJobsPage() {
  const { jobs, error } = await getJobs();

  return (
    <main className="min-h-[calc(100svh-2.5rem)] bg-background px-4 pb-12 pt-5 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <header className="flex flex-col justify-between gap-5 pb-7 sm:flex-row sm:items-center">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <span>Manage Jobs</span>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <span className="text-primary" aria-current="page">
                Job Listings &amp; Postings
              </span>
            </nav>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Manage Job Posts
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Review live listings, monitor applicants, and update job details
              across your organization.
            </p>
          </div>
          <Link
            href="/dashboard/recruiter/jobs/new"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Plus className="size-4" aria-hidden="true" />
            New Job Post
          </Link>
        </header>

        {error ? (
          <div
            role="alert"
            className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive"
          >
            {error}
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Building2 className="size-6" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-semibold">No job posts yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Create your first listing to start connecting with candidates.
            </p>
            <Link
              href="/dashboard/recruiter/jobs/new"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Create a job post{" "}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1120px] border-collapse text-left">
                <thead className="bg-muted/50">
                  <tr className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    <th className="px-4 py-4 sm:px-5">Job Title &amp; Dept</th>
                    <th className="px-4 py-4 sm:px-5">
                      Company &amp; Location
                    </th>
                    <th className="px-4 py-4 sm:px-5">Type</th>
                    <th className="px-4 py-4 sm:px-5">Compensation</th>
                    <th className="px-4 py-4 sm:px-5">Applicants</th>
                    <th className="px-4 py-4 sm:px-5">Status</th>
                    <th className="px-4 py-4 sm:px-5">Deadline</th>
                    <th className="px-4 py-4 sm:px-5">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <JobRow key={job.id} job={job} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
