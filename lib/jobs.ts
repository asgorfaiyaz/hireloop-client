import "server-only";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const JOBS_API_URL = `${process.env.SERVER_URL}/jobs`;

export type RecruiterTokenResult =
  | { success: true; token: string }
  | { success: false; message: string };

export async function getRecruiterToken(): Promise<RecruiterTokenResult> {
  try {
    const requestHeaders = await headers();
    const session = await auth.api.getSession({ headers: requestHeaders });

    if (!session) {
      return {
        success: false,
        message: "Please sign in to manage job listings.",
      };
    }
    if (session.user.role !== "recruiter") {
      return {
        success: false,
        message: "Only recruiter accounts can manage job listings.",
      };
    }

    const { token } = await auth.api.getToken({ headers: requestHeaders });
    return { success: true, token };
  } catch {
    return {
      success: false,
      message: "Could not verify your recruiter session. Please try again.",
    };
  }
}
