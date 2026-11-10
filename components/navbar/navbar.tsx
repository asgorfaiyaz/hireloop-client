import Link from "next/link";

import { NavbarLinks, MobileNav } from "@/components/navbar/navbar-nav";
import { ProfileMenu } from "@/components/navbar/profile-menu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 rounded-2xl border border-nav-border bg-nav-surface/80 px-4 shadow-nav backdrop-blur-xl sm:px-6">
        <Link
          href="/"
          className="font-heading text-sm font-semibold tracking-[0.24em] text-nav-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nav-ring"
        >
          HIRELOOP
        </Link>

        <div className="hidden min-w-0 flex-1 justify-center lg:flex">
          <NavbarLinks />
        </div>

        <div className="flex items-center gap-2">
          <ProfileMenu />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
