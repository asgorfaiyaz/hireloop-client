import type { ReactNode } from "react";
import { requireDashboardRole } from "@/lib/dashboard-auth";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  await requireDashboardRole("admin");
  return children;
}
