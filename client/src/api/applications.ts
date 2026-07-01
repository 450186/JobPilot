import axios from 'axios'
import type { Application } from '../types/Application'

const API_URL = 'http://localhost:5001'

export const getApplications = async (): Promise<Application[]> => {
    const response = await axios.get(`${API_URL}/applications`)
    return response.data
}

export type NewApplication = {
    company: string,
    role: string,
    location: string,
    status: string,
    job_url: string,
    notes: string,
    salary: number | null,
    deadline: string | null
}

export const createApplication = async (
    application: NewApplication
): Promise<Application> => {
    const response = await axios.post(`${API_URL}/applications`, application)
    return response.data
}

export const updateApplication = async (
    id: number,
    application: NewApplication
): Promise<Application> => {
    const response = await axios.put(`${API_URL}/applications/${id}`, application)
    return response.data
}

export const deleteApplication = async (
    id: number
): Promise<void> => (
    await axios.delete(`${API_URL}/applications/${id}`)
)