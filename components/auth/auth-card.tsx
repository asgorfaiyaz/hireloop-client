import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export function AuthCard({
  title,
  description,
  alternate,
  children,
}: {
  title: string;
  description: string;
  alternate: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-14 sm:py-20">
      <section className="w-full max-w-md rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
        <header className="mb-8">
          <div className="flex items-center justify-between gap-3">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Hireloop</p>
            <ThemeToggle />
          </div>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </header>
        {children}
        <p className="mt-6 text-center text-sm text-muted-foreground">{alternate}</p>
      </section>
    </main>
  );
}

export function AuthLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link className="font-medium text-foreground underline-offset-4 hover:underline" href={href}>{children}</Link>;
}

