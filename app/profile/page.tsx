import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CalendarDays, Mail, ShieldCheck, UserRound } from "lucide-react";
import { auth } from "@/lib/auth";
import { formatDate } from "@/lib/formatter";
import { ROLE_LABELS } from "@/lib/roles";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata = {
  title: "Your profile | Hireloop",
  description: "View your Hireloop account profile.",
};
export const instant = false;

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  const { user } = session;

  const initials = user.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="flex-1 px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Your profile
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your Hireloop account information.
          </p>
          </div>
          <ThemeToggle />
        </div>

        <section className="overflow-hidden rounded-3xl border bg-card shadow-sm">
          <div className="flex flex-col gap-5 border-b bg-muted/30 p-6 sm:flex-row sm:items-center sm:p-8">
            {user.image ? (
              <Image
                src={user.image}
                alt={`${user.name}'s profile`}
                width={80}
                height={80}
                className="size-20 rounded-full object-cover"
              />
            ) : (
              <div className="grid size-20 place-items-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">
                {initials || <UserRound className="size-8" />}
              </div>
            )}
            <div className="min-w-0">
              <h2 className="truncate text-xl font-semibold">{user.name}</h2>
              <p className="mt-1 truncate text-sm text-muted-foreground">
                {user.email}
              </p>
              <Badge className="mt-2">{ROLE_LABELS[user.role]}</Badge>
            </div>
          </div>

          <div className="grid gap-px bg-border sm:grid-cols-2">
            <ProfileDetail
              icon={UserRound}
              label="Full name"
              value={user.name}
            />
            <ProfileDetail
              icon={Mail}
              label="Email address"
              value={user.email}
            />
            <ProfileDetail
              icon={CalendarDays}
              label="Member since"
              value={formatDate(user.createdAt)}
            />
            <ProfileDetail
              icon={ShieldCheck}
              label="Account role"
              value={ROLE_LABELS[user.role]}
            />
            <ProfileDetail
              icon={ShieldCheck}
              label="Email status"
              value={user.emailVerified ? "Verified" : "Not verified"}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function ProfileDetail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof UserRound;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 bg-card p-5 sm:p-6">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-1 truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
