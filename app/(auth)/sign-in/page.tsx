import { AuthCard, AuthLink } from "@/components/auth/auth-card";
import { AuthForm } from "@/components/auth/auth-form";

export default function SignInPage() {
  return (
    <AuthCard title="Welcome back" description="Sign in to continue to your hiring workspace." alternate={<>New to Hireloop? <AuthLink href="/sign-up">Create an account</AuthLink></>}>
      <AuthForm mode="sign-in" />
    </AuthCard>
  );
}

