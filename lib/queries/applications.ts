import "server-only";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export type SeekerApplication = {
  id: string;
  status: string;
  createdAt: string;
  job: {
    id: string;
    title: string;
    companyName: string;
    category: string;
    jobType: string;
    isRemote: boolean;
    location: string;
  };
};

type ApiApplication = {
  _id: string;
  status: string;
  createdAt: string;
  job: {
    _id: string;
    title: string;
    companyName: string;
    category: string;
    jobType: string;
    isRemote: boolean;
    location: string;
  };
};

type ApplicationsResponse =
  | ApiApplication[]
  | {
      data?: { applications?: ApiApplication[] };
      applications?: ApiApplication[];
    };

export async function getSeekerApplications(): Promise<{
  applications: SeekerApplication[];
  error?: string;
}> {
  try {
    const requestHeaders = await headers();
    const session = await auth.api.getSession({ headers: requestHeaders });

    if (!session) {
      return { applications: [], error: "Please sign in to view applications." };
    }
    if (session.user.role !== "seeker") {
      return {
        applications: [],
        error: "Only job seeker accounts can view applications.",
      };
    }

    const { token } = await auth.api.getToken({ headers: requestHeaders });
    const query = new URLSearchParams({ userId: session.user.id });
    const response = await fetch(
      `${process.env.SERVER_URL}/applications?${query.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return {
        applications: [],
        error: "Could not load your applications. Please try again.",
      };
    }

    const payload = (await response.json()) as ApplicationsResponse;
    const records = Array.isArray(payload)
      ? payload
      : (payload.data?.applications ?? payload.applications ?? []);

    return {
      applications: records.map((application) => ({
        id: application._id,
        status: application.status,
        createdAt: application.createdAt,
        job: {
          id: application.job._id,
          title: application.job.title,
          companyName: application.job.companyName,
          category: application.job.category,
          jobType: application.job.jobType,
          isRemote: application.job.isRemote,
          location: application.job.location,
        },
      })),
    };
  } catch {
    return {
      applications: [],
      error: "Could not connect to the application service.",
    };
  }
}
