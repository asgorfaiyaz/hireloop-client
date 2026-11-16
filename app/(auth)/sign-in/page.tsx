import { Suspense } from "react";
import { AuthCard, AuthLink } from "@/components/auth/auth-card";
import { AuthForm } from "@/components/auth/auth-form";
import { Skeleton } from "@/components/ui/skeleton";

function getSafeRedirectTo(value: string | string[] | undefined) {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (!candidate) return "/";

  try {
    const destination = new URL(candidate, "https://hireloop.local");
    if (destination.origin !== "https://hireloop.local") return "/";
    return `${destination.pathname}${destination.search}${destination.hash}`;
  } catch {
    return "/";
  }
}

async function SignInContent({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { redirectTo } = await searchParams;

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to continue to your hiring workspace."
      alternate={
        <>
          New to Hireloop?{" "}
          <AuthLink href="/sign-up">Create an account</AuthLink>
        </>
      }
    >
      <AuthForm mode="sign-in" redirectTo={getSafeRedirectTo(redirectTo)} />
    </AuthCard>
  );
}

function SignInFallback() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-14 sm:py-20">
      <section className="w-full max-w-md rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="mt-8 h-8 w-48" />
        <Skeleton className="mt-3 h-4 w-64" />
        <Skeleton className="mt-8 h-10 w-full" />
        <Skeleton className="mt-4 h-10 w-full" />
        <Skeleton className="mt-4 h-10 w-full" />
      </section>
    </main>
  );
}

export default function SignInPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={<SignInFallback />}>
      <SignInContent searchParams={searchParams} />
    </Suspense>
  );
}
