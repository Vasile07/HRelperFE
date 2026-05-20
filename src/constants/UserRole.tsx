export const UserRole = {
    Recruiter: "RECRUITER",
    HiringManager: "HIRING_MANAGER",
    Admin: "ADMIN",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];