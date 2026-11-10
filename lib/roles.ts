export const USER_ROLES = ["seeker", "recruiter", "admin"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const ROLE_LABELS: Record<UserRole, string> = {
  seeker: "Job seeker",
  recruiter: "Recruiter",
  admin: "Administrator",
};
