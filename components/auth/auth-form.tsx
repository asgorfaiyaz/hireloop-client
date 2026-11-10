"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const signInSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const signUpSchema = signInSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters.").max(80),
});

type AuthValues = { name?: string; email: string; password: string };

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const isSignUp = mode === "sign-up";
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const form = useForm<AuthValues>({
    resolver: zodResolver(isSignUp ? signUpSchema : signInSchema) as never,
    defaultValues: { name: "", email: "", password: "" },
  });

  async function onSubmit(values: AuthValues) {
    setServerError(null);
    setPending(true);

    const result = isSignUp
      ? await authClient.signUp.email({
          name: values.name ?? "",
          email: values.email,
          password: values.password,
          callbackURL: "/",
        })
      : await authClient.signIn.email({
          email: values.email,
          password: values.password,
          callbackURL: "/",
        });
    setPending(false);

    if (result.error) {
      setServerError(
        result.error.message ?? "Unable to complete authentication.",
      );
      return;
    }

    router.push("/");
    router.refresh();
  }

  async function onGoogleSignIn() {
    setServerError(null);
    setPending(true);
    const result = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    if (result.error) {
      setPending(false);
      setServerError(result.error.message ?? "Unable to continue with Google.");
    }
  }

  return (
    <div className="space-y-5">
      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled={pending}
        onClick={onGoogleSignIn}
      >
        <GoogleMark />
        Continue with Google
      </Button>
      <FieldSeparator>or continue with email</FieldSeparator>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          {isSignUp && (
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input
                id="name"
                autoComplete="name"
                placeholder="Alex Morgan"
                aria-invalid={!!form.formState.errors.name}
                {...form.register("name")}
              />
              <FieldError errors={[form.formState.errors.name]} />
            </Field>
          )}
          <Field data-invalid={!!form.formState.errors.email}>
            <FieldLabel htmlFor="email">Email address</FieldLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={!!form.formState.errors.email}
              {...form.register("email")}
            />
            <FieldError errors={[form.formState.errors.email]} />
          </Field>
          <Field data-invalid={!!form.formState.errors.password}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              placeholder="At least 8 characters"
              aria-invalid={!!form.formState.errors.password}
              {...form.register("password")}
            />
            <FieldError errors={[form.formState.errors.password]} />
          </Field>
          {serverError && (
            <p role="alert" className="text-sm text-destructive">
              {serverError}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Please wait…" : isSignUp ? "Create account" : "Sign in"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}

function GoogleMark() {
  return (
    <span aria-hidden="true" className="font-semibold text-base">
      G
    </span>
  );
}
