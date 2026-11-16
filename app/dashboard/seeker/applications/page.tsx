import { Suspense } from "react";
import Link from "next/link";
import {
  Bell,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Download,
  Mail,
  Search,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getSeekerApplications,
  type SeekerApplication,
} from "@/lib/queries/applications";

function formatAppliedDate(value: string) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function formatStatus(status: string) {
  switch (status.toLowerCase()) {
    case "pending":
      return { label: "Applied", className: "bg-muted text-muted-foreground" };
    case "review":
      return {
        label: "In review",
        className: "border-amber-500/30 bg-amber-500/10 text-amber-500",
      };
    case "interview":
      return {
        label: "Interview",
        className: "border-violet-500/30 bg-violet-500/10 text-violet-500",
      };
    case "shortlisted":
      return {
        label: "Shortlisted",
        className: "border-sky-500/30 bg-sky-500/10 text-sky-500",
      };
    case "rejected":
      return {
        label: "Rejected",
        className: "border-red-500/30 bg-red-500/10 text-red-500",
      };
    case "offered":
      return {
        label: "Offered",
        className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
      };
    default:
      return {
        label: status,
        className: "bg-muted text-muted-foreground",
      };
  }
}

function SummaryCard({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string | number;
  valueClassName?: string;
}) {
  return (
    <section className="rounded-xl border border-border bg-card px-5 py-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={`mt-1 text-2xl font-semibold tracking-tight ${valueClassName ?? ""}`}>
        {value}
      </p>
    </section>
  );
}

function ApplicationRow({ application }: { application: SeekerApplication }) {
  const status = formatStatus(application.status);

  return (
    <tr className="border-t border-border transition-colors hover:bg-muted/20">
      <td className="px-4 py-3.5 sm:px-6">
        <div className="flex min-w-56 items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground">
            <BriefcaseBusiness aria-hidden="true" className="size-4" />
          </span>
          <div className="min-w-0">
            <Link
              href={`/browse-jobs/${encodeURIComponent(application.job.id)}`}
              className="block truncate text-sm font-medium hover:text-primary hover:underline"
            >
              {application.job.title}
            </Link>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {application.job.jobType}
              {application.job.isRemote ? " • Remote" : " • On-site"}
            </p>
          </div>
        </div>
      </td>
      <td className="min-w-44 px-4 py-3.5 text-sm sm:px-6">
        {application.job.companyName}
      </td>
      <td className="min-w-36 px-4 py-3.5 text-sm text-muted-foreground sm:px-6">
        {formatAppliedDate(application.createdAt)}
      </td>
      <td className="px-4 py-3.5 sm:px-6">
        <span
          className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${status.className}`}
        >
          {status.label}
        </span>
      </td>
      <td className="px-4 py-3.5 text-right sm:px-6">
        <Link
          href={`/browse-jobs/${encodeURIComponent(application.job.id)}`}
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className: "text-muted-foreground",
          })}
        >
          Details
        </Link>
      </td>
    </tr>
  );
}

async function ApplicationsContent() {
  const { applications, error } = await getSeekerApplications();
  const visibleApplications = applications.slice(0, 5);
  const shortlistedCount = applications.filter(
    (application) => application.status.toLowerCase() === "shortlisted",
  ).length;
  const interviewCount = applications.filter(
    (application) => application.status.toLowerCase() === "interview",
  ).length;
  const successCount = applications.filter((application) =>
    ["offered", "accepted"].includes(application.status.toLowerCase()),
  ).length;
  const successRate = applications.length
    ? `${Math.round((successCount / applications.length) * 100)}%`
    : "0%";

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-3">
        <div className="relative w-full max-w-sm">
          <Search
            aria-hidden="true"
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            aria-label="Search applications"
            placeholder="Search applications..."
            className="h-9 border-border bg-background pl-9"
          />
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell aria-hidden="true" className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Messages">
            <Mail aria-hidden="true" className="size-5" />
          </Button>
          <span className="ml-2 grid size-9 place-items-center rounded-full bg-primary/15 text-primary">
            <CircleUserRound aria-hidden="true" className="size-5" />
          </span>
        </div>
      </header>

      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            My Applications
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your job applications and interview progress in one place.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-border bg-card p-1">
            <Button size="sm" className="h-8 px-4">Active</Button>
            <Button variant="ghost" size="sm" className="h-8 px-4 text-muted-foreground">
              Archived
            </Button>
          </div>
          <Button
            variant="default"
            className="h-10 bg-foreground text-background hover:bg-foreground/90"
          >
            <Download aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">Export PDF</span>
          </Button>
        </div>
      </section>

      {error ? (
        <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard label="Total Applied" value={applications.length} />
            <SummaryCard label="Shortlisted" value={shortlistedCount} />
            <SummaryCard
              label="Interviews"
              value={interviewCount}
              valueClassName="text-amber-500"
            />
            <SummaryCard
              label="Success Rate"
              value={successRate}
              valueClassName="text-emerald-500"
            />
          </div>

          <section className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="bg-muted/40 text-xs text-muted-foreground">
                    <th scope="col" className="px-4 py-3 font-medium sm:px-6">Job Title</th>
                    <th scope="col" className="px-4 py-3 font-medium sm:px-6">Company</th>
                    <th scope="col" className="px-4 py-3 font-medium sm:px-6">Applied</th>
                    <th scope="col" className="px-4 py-3 font-medium sm:px-6">Status</th>
                    <th scope="col" className="px-4 py-3 text-right font-medium sm:px-6">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleApplications.map((application) => (
                    <ApplicationRow key={application.id} application={application} />
                  ))}
                </tbody>
              </table>
            </div>

            {visibleApplications.length === 0 && (
              <div className="px-6 py-12 text-center">
                <CheckCircle2 aria-hidden="true" className="mx-auto size-8 text-muted-foreground" />
                <h2 className="mt-3 font-medium">No applications yet</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Jobs you apply to will appear here.
                </p>
                <Link href="/browse-jobs" className={buttonVariants({ className: "mt-5" })}>
                  Browse jobs
                </Link>
              </div>
            )}

            <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3.5 sm:px-6">
              <p className="text-sm text-muted-foreground">
                Showing {applications.length ? 1 : 0}–{visibleApplications.length} of {applications.length} applications
              </p>
              <nav aria-label="Application pages" className="flex items-center gap-1">
                <Button variant="outline" size="icon" aria-label="Previous page" disabled>
                  <ChevronLeft aria-hidden="true" className="size-4" />
                </Button>
                <Button aria-current="page" className="size-9 px-0">1</Button>
                <Button variant="outline" className="size-9 px-0">2</Button>
                <Button variant="outline" className="size-9 px-0">3</Button>
                <Button variant="outline" size="icon" aria-label="Next page">
                  <ChevronRight aria-hidden="true" className="size-4" />
                </Button>
              </nav>
            </footer>
          </section>
        </>
      )}
    </div>
  );
}

function ApplicationsFallback() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-14 w-full rounded-xl" />
      <Skeleton className="h-12 w-72" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-[86px] rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-[360px] w-full rounded-xl" />
    </div>
  );
}

export default function SeekerApplicationsPage() {
  return (
    <section className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <Suspense fallback={<ApplicationsFallback />}>
        <ApplicationsContent />
      </Suspense>
    </section>
  );
}
