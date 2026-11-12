import type { ReactNode } from "react";
import { requireDashboardRole } from "@/lib/dashboard-auth";

export default async function SeekerDashboardLayout({ children }: { children: ReactNode }) {
  await requireDashboardRole("seeker");
  return children;
}
