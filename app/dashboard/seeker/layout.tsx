import type { ReactNode } from "react";
import { requireDashboardRole } from "@/lib/dashboard-auth";
export const instant = false;

export default async function SeekerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireDashboardRole("seeker");
  return children;
}
