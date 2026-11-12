"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  BriefcaseBusiness,
  ClipboardList,
  FileText,
  LayoutDashboard,
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
    { label: "Jobs", href: "/dashboard/recruiter", icon: BriefcaseBusiness },
    {
      label: "Applicants",
      href: "/dashboard/recruiter/applicants",
      icon: ClipboardList,
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
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link
          href={`/dashboard/${role}`}
          className="px-2 py-2 text-lg font-semibold"
        >
          HireLoop
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{ROLE_LABELS[role]} dashboard</SidebarGroupLabel>
          <SidebarMenu>
            {navigationByRole[role].map(({ label, href, icon: Icon }) => {
              const active =
                pathname === href ||
                (href !== `/dashboard/${role}` &&
                  pathname.startsWith(`${href}/`));

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
        <div className="truncate px-2 py-2 text-sm">
          <div className="truncate font-medium">{name}</div>
          <div className="text-muted-foreground">{ROLE_LABELS[role]}</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
