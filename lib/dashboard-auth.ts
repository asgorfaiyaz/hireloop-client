import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { USER_ROLES, type UserRole } from "@/lib/roles";

export function isUserRole(role: unknown): role is UserRole {
  return typeof role === "string" && USER_ROLES.some((validRole) => validRole === role);
}

export function dashboardPath(role: UserRole) {
  return `/dashboard/${role}`;
}

export async function getDashboardUser() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  if (!isUserRole(session.user.role)) {
    redirect("/sign-in");
  }

  return { user: session.user, role: session.user.role };
}

export async function requireDashboardRole(requiredRole: UserRole) {
  const { user, role } = await getDashboardUser();

  if (role !== requiredRole) {
    redirect(dashboardPath(role));
  }

  return user;
}
