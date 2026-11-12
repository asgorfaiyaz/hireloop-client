import { redirect } from "next/navigation";
import { dashboardPath, getDashboardUser } from "@/lib/dashboard-auth";

export default async function DashboardIndexPage() {
  const { role } = await getDashboardUser();
  redirect(dashboardPath(role));
}
