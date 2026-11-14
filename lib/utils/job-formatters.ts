import type { JobListing } from "@/lib/queries/jobs";

export function formatDate(value: string) {
  const date = new Date(`${value.slice(0, 10)}T00:00:00Z`);
  if (!Number.isFinite(date.getTime())) return "No deadline";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatPostedAt(value: string | null) {
  if (!value) return "Recently posted";
  const timestamp = new Date(value).getTime();
  if (!Number.isFinite(timestamp)) return "Recently posted";

  const days = Math.max(0, Math.floor((Date.now() - timestamp) / 86_400_000));
  if (days === 0) return "Posted today";
  if (days === 1) return "Posted 1 day ago";
  if (days < 7) return `Posted ${days} days ago`;
  const weeks = Math.floor(days / 7);
  return `Posted ${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
}

export function formatCompensation(job: JobListing) {
  if (job.minSalary === null && job.maxSalary === null) return "Not specified";

  const range =
    job.minSalary !== null && job.maxSalary !== null
      ? `${job.currency} ${job.minSalary.toLocaleString()} – ${job.currency} ${job.maxSalary.toLocaleString()}`
      : job.minSalary !== null
        ? `From ${job.currency} ${job.minSalary.toLocaleString()}`
        : `Up to ${job.currency} ${job.maxSalary?.toLocaleString()}`;

  return `${range}${job.frequency ? ` / ${job.frequency.replace("per ", "")}` : ""}`;
}

export function formatJobLocation(job: Pick<JobListing, "isRemote" | "location">) {
  if (job.isRemote) return job.location ? `Remote · ${job.location}` : "Remote";
  return job.location || "Location not specified";
}

export function formatDeadline(value: string) {
  if (!value) return "Not specified";
  const date = new Date(`${value.slice(0, 10)}T00:00:00`);
  return Number.isFinite(date.getTime()) ? date.toLocaleDateString() : "Not specified";
}
