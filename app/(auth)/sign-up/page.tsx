import { AuthCard, AuthLink } from "@/components/auth/auth-card";
import { AuthForm } from "@/components/auth/auth-form";

export default function SignUpPage() {
  return (
    <AuthCard title="Create your account" description="Join Hireloop and make your next career move." alternate={<>Already have an account? <AuthLink href="/sign-in">Sign in</AuthLink></>}>
      <AuthForm mode="sign-up" />
    </AuthCard>
  );
}

