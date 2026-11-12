import type { ReactNode } from "react";
import { requireDashboardRole } from "@/lib/dashboard-auth";
export const instant = false;
export default async function RecruiterDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireDashboardRole("recruiter");
  return children;
}
