import type Technology from "./Technology.ts";

export default interface JobPost {
    jobId: number | undefined,
    roleId: number | undefined,
    departmentId: number | undefined,
    description: string,
    skills: string[],
    technologies: Technology[],
    guides: string[]
}