import "server-only";
import { getRecruiterToken, JOBS_API_URL } from "../jobs";
import type { JobFormValues } from "@/lib/schemas/job";

export type JobListing = {
  id: string;
  title: string;
  companyName: string;
  category: string;
  jobType: string;
  isRemote: boolean;
  location: string;
  deadline: string;
  minSalary: number | null;
  maxSalary: number | null;
  frequency: string;
  responsibilities: string;
  qualifications: string;
  currency: string;
  applicantCount: number | null;
  status: "active" | "expired" | "paused";
  createdAt: string | null;
};

type ApiJob = JobFormValues & { _id: string };

function formatJob(job: ApiJob): JobListing {
  return {
    id: job._id,
    title: job.title,
    companyName: job.companyName,
    category: job.category,
    jobType: job.jobType,
    isRemote: job.isRemote,
    location: job.location,
    deadline: job.deadline,
    minSalary: job.minSalary ?? null,
    maxSalary: job.maxSalary ?? null,
    frequency: job.frequency,
    responsibilities: job.responsibilities,
    qualifications: job.qualifications,
    currency: "EUR",
    applicantCount: null,
    status:
      job.deadline && new Date(job.deadline) < new Date()
        ? "expired"
        : "active",
    createdAt: null,
  };
}

export async function getJobs(): Promise<{
  jobs: JobListing[];
  error?: string;
}> {
  const auth = await getRecruiterToken();
  if (!auth.success) return { jobs: [], error: auth.message };

  try {
    const response = await fetch(JOBS_API_URL, {
      headers: { Authorization: `Bearer ${auth.token}` },
      cache: "no-store",
    });
    if (!response.ok)
      return { jobs: [], error: "Could not load job listings." };

    const data: ApiJob[] = await response.json();
    return {
      jobs: data.map(formatJob),
    };
  } catch {
    return { jobs: [], error: "Could not connect to the job service." };
  }
}

export async function getJobById(
  id: string,
): Promise<{ job: JobListing | null; error?: string }> {
  const auth = await getRecruiterToken();
  if (!auth.success) return { job: null, error: auth.message };
  if (!id) return { job: null, error: "A job ID is required." };

  try {
    const response = await fetch(`${JOBS_API_URL}/${encodeURIComponent(id)}`, {
      headers: { Authorization: `Bearer ${auth.token}` },
      cache: "no-store",
    });
    if (!response.ok) return { job: null, error: "Could not load this job." };

    return { job: formatJob((await response.json()) as ApiJob) };
  } catch {
    return { job: null, error: "Could not connect to the job service." };
  }
}
