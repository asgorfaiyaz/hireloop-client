import DashboardSection from "@/components/dashboard/DashboardSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function RecruiterDashboardJobsPage() {
  return (
    <div className="min-h-[calc(100svh-2.5rem)] bg-background px-6 py-8 text-foreground lg:px-8">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4">
        <DashboardSection
          title="Manage Jobs"
          description="Manage your job posts and review applicants."
        />
        <Link
          href="/dashboard/recruiter/jobs/new"
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Add Job <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
