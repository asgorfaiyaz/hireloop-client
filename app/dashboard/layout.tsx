import { Suspense } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { getDashboardUser } from "@/lib/dashboard-auth";
export const instant = false;

async function DashboardContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, role } = await getDashboardUser();

  return (
    <SidebarProvider>
      <DashboardSidebar role={role} name={user.name} />
      <main className="min-w-0 flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}

function DashboardFallback() {
  return (
    <div className="flex min-h-svh w-full">
      <aside className="hidden w-64 shrink-0 border-r border-border p-6 md:block">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="mt-10 h-10 w-full" />
        <Skeleton className="mt-3 h-10 w-full" />
        <Skeleton className="mt-3 h-10 w-full" />
      </aside>
      <main className="min-w-0 flex-1 p-6">
        <Skeleton className="h-9 w-9" />
        <Skeleton className="mt-8 h-8 w-64" />
        <Skeleton className="mt-4 h-5 w-96 max-w-full" />
      </main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<DashboardFallback />}>
      <DashboardContent>{children}</DashboardContent>
    </Suspense>
  );
}
