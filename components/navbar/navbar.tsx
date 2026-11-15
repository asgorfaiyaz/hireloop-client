import Link from "next/link";
import Image from "next/image";

import { NavbarLinks, MobileNav } from "@/components/navbar/navbar-nav";
import { ProfileMenu } from "@/components/navbar/profile-menu";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 rounded-2xl border border-nav-border bg-nav-surface/80 px-4 shadow-nav backdrop-blur-xl sm:px-6">
        {" "}
        <Link
          href="/"
          aria-label="Hireloop home"
          className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nav-ring"
        >
          <Image
            src="/images/logo.png"
            alt="Hireloop"
            width={152}
            height={38}
            priority
            className="h-auto w-20 object-contain min-[380px]:w-24 sm:w-[152px]"
          />
        </Link>
        <div className="hidden min-w-0 items-center gap-2 lg:flex">
          <NavbarLinks />
          <span aria-hidden="true" className="mx-1 h-6 w-px bg-nav-border" />
          <ThemeToggle />
          <ProfileMenu />
        </div>
        <div className="flex items-center gap-0.5 lg:hidden sm:gap-1">
          <ThemeToggle />
          <ProfileMenu />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
