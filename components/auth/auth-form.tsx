"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  useForm,
  useWatch,
  type Control,
  type UseFormSetValue,
} from "react-hook-form";
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
import { toast } from "@/components/ui/toast";

const signInSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const signUpSchema = signInSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters.").max(80),
  role: z.enum(["seeker", "recruiter"]),
});

type AuthValues = {
  name?: string;
  email: string;
  password: string;
  role?: "seeker" | "recruiter";
};

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const isSignUp = mode === "sign-up";
  const router = useRouter();
  const [googlePending, setGooglePending] = useState(false);
  const form = useForm<AuthValues>({
    resolver: zodResolver(isSignUp ? signUpSchema : signInSchema) as never,
    defaultValues: { name: "", email: "", password: "", role: "seeker" },
  });
  async function onSubmit(values: AuthValues) {
    try {
      const result = isSignUp
        ? await authClient.signUp.email({
            name: values.name ?? "",
            email: values.email,
            password: values.password,
            role: values.role ?? "seeker",
            callbackURL: "/sign-in",
          })
        : await authClient.signIn.email({
            email: values.email,
            password: values.password,
          });

      if (result.error) {
        toast.add({
          title: isSignUp ? "Sign-up failed" : "Sign-in failed",
          description:
            result.error.message ?? "Unable to complete authentication.",
          type: "error",
        });
        return;
      }

      toast.add({
        title: isSignUp ? "Account created" : "Signed in",
        description: isSignUp
          ? "Your account is ready. Sign in to continue."
          : "You’re now signed in to Hireloop.",
        type: "success",
        timeout: 5000,
      });
      router.replace(isSignUp ? "/sign-in" : "/");
      router.refresh();
    } catch {
      toast.add({
        title: isSignUp ? "Sign-up failed" : "Sign-in failed",
        description: "Something went wrong. Please try again.",
        type: "error",
      });
    }
  }

  async function onGoogleSignIn() {
    setGooglePending(true);
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      if (!result.error) return;
      setGooglePending(false);
      toast.add({
        title: "Google sign-in failed",
        description: result.error.message ?? "Unable to continue with Google.",
        type: "error",
      });
    } catch {
      setGooglePending(false);
      toast.add({
        title: "Google sign-in failed",
        description: "Something went wrong. Please try again.",
        type: "error",
      });
    }
  }

  return (
    <div className="space-y-5">
      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled={googlePending || form.formState.isSubmitting}
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
          {isSignUp && (
            <RolePicker control={form.control} setValue={form.setValue} />
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
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting || googlePending}
          >
            {form.formState.isSubmitting
              ? "Please wait…"
              : isSignUp
                ? "Create account"
                : "Sign in"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}

const RolePicker = function RolePicker({
  control,
  setValue,
}: {
  control: Control<AuthValues>;
  setValue: UseFormSetValue<AuthValues>;
}) {
  const selectedRole = useWatch({ control, name: "role" });

  return (
    <Field>
      <FieldLabel id="role-label">I am joining as</FieldLabel>
      <div
        role="group"
        aria-labelledby="role-label"
        className="grid grid-cols-2 gap-2"
      >
        {(["seeker", "recruiter"] as const).map((role) => (
          <Button
            key={role}
            type="button"
            variant={selectedRole === role ? "default" : "outline"}
            aria-pressed={selectedRole === role}
            onClick={() => setValue("role", role)}
            className="capitalize"
          >
            {role}
          </Button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Administrator access is assigned separately.
      </p>
    </Field>
  );
};

function GoogleMark() {
  return (
    <span aria-hidden="true" className="font-semibold text-base">
      G
    </span>
  );
}
