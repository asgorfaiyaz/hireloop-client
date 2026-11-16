"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

type ApplicationActionResult =
  | { success: true; message: string }
  | { success: false; message: string };

export async function createApplication(
  jobId: string,
): Promise<ApplicationActionResult> {
  try {
    const requestHeaders = await headers();
    const session = await auth.api.getSession({ headers: requestHeaders });

    if (!session) {
      return {
        success: false,
        message: "Please sign in to apply for this job.",
      };
    }
    if (session.user.role !== "seeker") {
      return {
        success: false,
        message: "Only job seekers can apply for jobs.",
      };
    }

    const { token } = await auth.api.getToken({ headers: requestHeaders });
    const response = await fetch(`${process.env.SERVER_URL}/applications`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: session.user.id, jobId }),
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        success: false,
        message: "Could not submit your application. Please try again.",
      };
    }

    revalidatePath("/dashboard/seeker/applications");
    return { success: true, message: "Your application has been submitted." };
  } catch {
    return {
      success: false,
      message:
        "Could not connect to the application service. Please try again.",
    };
  }
}
