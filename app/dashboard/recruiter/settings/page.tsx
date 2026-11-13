import DashboardSection from "@/components/dashboard/DashboardSection";

export default function RecruiterSettingsPage() {
  return (
    <div className="min-h-[calc(100svh-2.5rem)] bg-background text-foreground">
      <DashboardSection
        title="Settings"
        description="Recruiter account settings will be available here."
      />
    </div>
  );
}
