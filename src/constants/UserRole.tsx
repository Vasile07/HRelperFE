export const UserRole = {
    Recruiter: "RECRUITER",
    HiringManager: "HIRING_MANAGER",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];