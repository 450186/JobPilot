export interface Application {
    id: number,
    company: string,
    role: string,
    location: string | null,
    status: string,
    job_url: string | null,
    notes: string | null,
    salary: number | null,
    deadline: string | null
}