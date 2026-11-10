"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, UserRound } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { ROLE_LABELS } from "@/lib/roles";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const profileLinks = [
  { label: "Profile", href: "/profile", icon: UserRound },
] as const;

export function ProfileMenu() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <div
        aria-hidden="true"
        className="size-9 animate-pulse rounded-full bg-nav-hover"
      />
    );
  }

  if (!session) {
    return (
      <Link
        href="/sign-up"
        className="inline-flex h-9 items-center justify-center rounded-md bg-nav-avatar px-4 text-sm font-medium text-nav-avatar-foreground transition-colors hover:bg-nav-avatar/90"
      >
        Get started
      </Link>
    );
  }

  const { user } = session;
  const initials = user.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="h-10 gap-2 rounded-full px-1.5 text-nav-foreground hover:bg-nav-hover hover:text-nav-foreground"
            aria-label="Open profile menu"
          />
        }
      >
        {user.image ? (
          <Image
            src={user.image}
            alt=""
            width={32}
            height={32}
            className="size-8 rounded-full object-cover"
          />
        ) : (
          <span className="grid size-8 place-items-center rounded-full bg-nav-avatar text-xs font-semibold text-nav-avatar-foreground">
            {initials || <UserRound className="size-4" />}
          </span>
        )}
        <span className="hidden max-w-32 truncate text-sm sm:inline">
          {user.name}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="px-2.5 py-2">
          <p className="truncate text-sm font-medium">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          <Badge className="mt-2">{ROLE_LABELS[user.role]}</Badge>
        </div>
        <DropdownMenuSeparator />
        {profileLinks.map(({ label, href, icon: Icon }) => (
          <DropdownMenuItem key={href} render={<Link href={href} />}>
            <Icon className="size-4" />
            {label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-destructive data-highlighted:text-destructive"
        >
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
