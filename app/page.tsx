import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  Check,
  UsersRound,
} from "lucide-react";
import { Navbar } from "@/components/navbar/navbar";

const highlights = [
  {
    icon: BriefcaseBusiness,
    title: "Find work that fits",
    description:
      "Explore opportunities and keep your applications organized in one place.",
  },
  {
    icon: Building2,
    title: "Hire with confidence",
    description:
      "Create clear job listings and keep your candidate pipeline moving.",
  },
  {
    icon: UsersRound,
    title: "Built for the whole team",
    description:
      "Give seekers, recruiters, and administrators a workspace for their work.",
  },
];

const pipeline = [
  {
    title: "Frontend Developer",
    company: "Northstar Studio",
    type: "Full-time",
  },
  { title: "Product Designer", company: "Fieldwork", type: "Remote" },
  { title: "People Operations Lead", company: "Common Ground", type: "Hybrid" },
];

export default function Home() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <Navbar />

      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-0 -z-10 size-[28rem] rounded-full bg-primary/10 blur-3xl"
        />
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-14 px-6 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <h1 className="mt-7 text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              Find the right fit.
              <span className="mt-2 block text-primary">
                Build what’s next.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              HireLoop brings job seekers and hiring teams together, with the
              tools to make every step clearer and more focused.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sign-up"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Get started <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/#jobs"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Explore HireLoop{" "}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Start with a free account. Your next opportunity is one step
              closer.
            </p>
          </div>

          <aside
            aria-label="Illustrative job discovery preview"
            className="mx-auto w-full max-w-xl"
          >
            <div className="rounded-3xl border border-border bg-card p-4 shadow-2xl shadow-foreground/5 sm:p-6">
              <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Your next step
                  </p>
                  <h2 className="mt-1 text-xl font-semibold tracking-tight">
                    Opportunities to explore
                  </h2>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <BriefcaseBusiness className="size-5" aria-hidden="true" />
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {pipeline.map((job) => (
                  <article
                    key={job.title}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-background p-3.5 sm:gap-4 sm:p-4"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground">
                      <Building2 className="size-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold">
                        {job.title}
                      </h3>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {job.company}
                      </p>
                    </div>
                    <span className="hidden shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground sm:inline-flex">
                      {job.type}
                    </span>
                    <Bookmark
                      className="size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </article>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-muted p-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <p className="text-sm leading-6 text-muted-foreground">
                  Save roles, track applications, and stay on top of what comes
                  next.
                </p>
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                A preview of the HireLoop experience
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section
        id="jobs"
        className="scroll-mt-24 border-t border-border bg-card/60"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              A better way forward
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need to move work forward.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Whether you’re looking for your next role or building a team,
              HireLoop keeps the important work in reach.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {highlights.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-border bg-background p-6 transition-colors hover:bg-accent/50"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
