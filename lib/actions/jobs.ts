"use server";

import { revalidatePath } from "next/cache";
import { jobSchema } from "@/lib/schemas/job";
import { getRecruiterToken, JOBS_API_URL } from "../jobs";

type ActionResult =
  | { success: true; message: string }
  | {
      success: false;
      message: string;
      fieldErrors?: Record<string, string>;
    };

async function callJobsApi(
  url: string,
  method: "POST" | "PATCH" | "DELETE",
  token: string,
  body?: unknown,
): Promise<ActionResult> {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const responseBody = await response.json().catch(() => null);
      const apiMessage =
        responseBody && typeof responseBody.message === "string"
          ? responseBody.message
          : undefined;

      return {
        success: false,
        message:
          apiMessage ??
          (response.status === 401 || response.status === 403
            ? "You are not authorized to manage this job."
            : "The job service could not complete this request. Please try again."),
      };
    }

    return { success: true, message: "Job request completed." };
  } catch {
    return {
      success: false,
      message:
        "Could not connect to the job service. Check that the API is running and try again.",
    };
  }
}

function getValidationErrors(error: {
  issues: Array<{ path: PropertyKey[]; message: string }>;
}) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && !fieldErrors[field]) {
      fieldErrors[field] = issue.message;
    }
  }
  return fieldErrors;
}

export async function createJob(input: unknown): Promise<ActionResult> {
  const authResult = await getRecruiterToken();
  if (!authResult.success) return authResult;

  const parsed = jobSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Review the highlighted fields and try again.",
      fieldErrors: getValidationErrors(parsed.error),
    };
  }

  const result = await callJobsApi(
    JOBS_API_URL,
    "POST",
    authResult.token,
    parsed.data,
  );
  if (result.success) {
    revalidatePath("/dashboard/recruiter/jobs");
    return { success: true, message: "Your job has been published." };
  }
  return result;
}

export async function updateJob(
  jobId: string,
  input: unknown,
): Promise<ActionResult> {
  const authResult = await getRecruiterToken();
  if (!authResult.success) return authResult;
  if (!jobId?.trim()) {
    return { success: false, message: "A valid job ID is required." };
  }

  const parsed = jobSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Review the highlighted fields and try again.",
      fieldErrors: getValidationErrors(parsed.error),
    };
  }

  const result = await callJobsApi(
    `${JOBS_API_URL}/${encodeURIComponent(jobId)}`,
    "PATCH",
    authResult.token,
    parsed.data,
  );
  if (result.success) {
    revalidatePath("/dashboard/recruiter/jobs");
    revalidatePath(`/dashboard/recruiter/jobs/${jobId}`);
    return { success: true, message: "Your job has been updated." };
  }
  return result;
}

export async function deleteJob(jobId: string): Promise<ActionResult> {
  const authResult = await getRecruiterToken();
  if (!authResult.success) return authResult;
  if (!jobId?.trim()) {
    return { success: false, message: "A valid job ID is required." };
  }

  const result = await callJobsApi(
    `${JOBS_API_URL}/${encodeURIComponent(jobId)}`,
    "DELETE",
    authResult.token,
  );
  if (result.success) {
    revalidatePath("/dashboard/recruiter/jobs");
    return { success: true, message: "Your job has been deleted." };
  }
  return result;
}
