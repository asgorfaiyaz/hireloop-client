"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navigationItems = [
  { label: "Overview", href: "/", icon: Home },
  { label: "Discover jobs", href: "/#jobs", icon: Compass },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href.split("#")[0];
}

export function NavbarLinks({
  mobile = false,
  onSelect,
}: {
  mobile?: boolean;
  onSelect?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary navigation"
      className={cn(
        "flex items-center",
        mobile ? "flex-col items-stretch gap-1" : "gap-1",
      )}
    >
      {navigationItems.map(({ label, href, icon: Icon }) => {
        const active = isActive(pathname, href);

        return (
          <Link
            key={label}
            href={href}
            aria-current={active ? "page" : undefined}
            onClick={onSelect}
            className={cn(
              "group inline-flex items-center gap-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nav-ring",
              mobile ? "w-full px-3 py-3" : "px-3 py-2",
              active
                ? "bg-nav-active text-nav-active-foreground shadow-sm"
                : "text-nav-muted hover:bg-nav-hover hover:text-nav-foreground",
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="text-nav-muted hover:bg-nav-hover hover:text-nav-foreground"
        aria-label="Open navigation menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Menu className="size-5" aria-hidden="true" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent aria-label="Mobile navigation">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-heading text-sm tracking-[0.2em]">
              HIRELOOP
            </SheetTitle>
            <SheetClose
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close navigation menu"
                />
              }
            >
              <X className="size-5" aria-hidden="true" />
            </SheetClose>
          </div>
          <div className="mt-8">
            <NavbarLinks mobile onSelect={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
