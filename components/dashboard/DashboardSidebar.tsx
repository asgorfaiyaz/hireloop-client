"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  BriefcaseBusiness,
  ClipboardList,
  CirclePlus,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import type { UserRole } from "@/lib/roles";
import { ROLE_LABELS } from "@/lib/roles";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigationByRole = {
  seeker: [
    { label: "Jobs", href: "/dashboard/seeker", icon: BriefcaseBusiness },
    {
      label: "Applications",
      href: "/dashboard/seeker/applications",
      icon: FileText,
    },
    {
      label: "Saved jobs",
      href: "/dashboard/seeker/saved-jobs",
      icon: Bookmark,
    },
  ],
  recruiter: [
    {
      label: "Overview",
      href: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    {
      label: "Add Job",
      href: "/dashboard/recruiter/jobs/new",
      icon: CirclePlus,
    },
    {
      label: "Manage Jobs",
      href: "/dashboard/recruiter/jobs",
      icon: BriefcaseBusiness,
    },
    {
      label: "Applicants",
      href: "/dashboard/recruiter/applicants",
      icon: ClipboardList,
    },
    {
      label: "Settings",
      href: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Users", href: "/dashboard/admin/users", icon: Users },
    { label: "Jobs", href: "/dashboard/admin/jobs", icon: BriefcaseBusiness },
  ],
} satisfies Record<
  UserRole,
  { label: string; href: string; icon: typeof BriefcaseBusiness }[]
>;

type DashboardSidebarProps = {
  role: UserRole;
  name: string;
};

export default function DashboardSidebar({
  role,
  name,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className={role === "recruiter" ? "bg-[#090909] text-white" : undefined}
    >
      <SidebarHeader>
        <Link
          href={`/dashboard/${role}`}
          className="px-2 py-2 text-lg font-semibold tracking-tight"
        >
          {role === "recruiter" ? (
            <><span className="text-sky-400">hire</span><span className="text-orange-400">loop</span></>
          ) : "HireLoop"}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {role !== "recruiter" && <SidebarGroupLabel>{ROLE_LABELS[role]} dashboard</SidebarGroupLabel>}
          {role === "recruiter" && (
            <div className="mb-3 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm font-semibold text-violet-200">
                {name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-white">{name}</div>
                <div className="text-xs text-zinc-400">Recruiter</div>
              </div>
            </div>
          )}
          <SidebarMenu>
            {navigationByRole[role].map(({ label, href, icon: Icon }) => {
              const active =
                pathname === href ||
                (href !== `/dashboard/${role}` &&
                  pathname.startsWith(`${href}/`) &&
                  !(role === "recruiter" && href === "/dashboard/recruiter/jobs" && pathname.startsWith("/dashboard/recruiter/jobs/new")));

              return (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    render={
                      <Link
                        href={href}
                        aria-current={active ? "page" : undefined}
                      />
                    }
                    isActive={active}
                    className={role === "recruiter" ? "text-zinc-400 hover:bg-white/10 hover:text-white data-active:bg-white/10 data-active:text-white" : undefined}
                    tooltip={label}
                  >
                    <Icon aria-hidden="true" />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {role !== "recruiter" && (
          <div className="truncate px-2 py-2 text-sm">
            <div className="truncate font-medium">{name}</div>
            <div className="text-muted-foreground">{ROLE_LABELS[role]}</div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
