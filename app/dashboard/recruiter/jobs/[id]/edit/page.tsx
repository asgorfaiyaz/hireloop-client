import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EditJobForm from "@/components/dashboard/EditJobForm";
import { getJobById } from "@/lib/queries/jobs";
import type { JobFormValues } from "@/lib/schemas/job";

export default async function EditJobPage({
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

  const initialValues: JobFormValues = {
    title: job.title,
    companyName: job.companyName,
    category: job.category,
    jobType: job.jobType as JobFormValues["jobType"],
    isRemote: job.isRemote,
    location: job.location,
    deadline: job.deadline.slice(0, 10),
    minSalary: job.minSalary ?? undefined,
    maxSalary: job.maxSalary ?? undefined,
    frequency: job.frequency as JobFormValues["frequency"],
    responsibilities: job.responsibilities,
    qualifications: job.qualifications,
  };
  return <EditJobForm jobId={job.id} initialValues={initialValues} />;
}
