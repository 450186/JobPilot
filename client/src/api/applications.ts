import axios from 'axios'
import type { Application } from '../types/Application'

const API_URL = 'http://localhost:5001'

const getAuthHeaders = () => {
    const token = localStorage.getItem('token')

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }   
}

const handleAuthError = (err: any): never => {
    if(err.response?.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
    }

    throw err
}

export const getApplications = async (): Promise<Application[]> => {
    try {
        const response = await axios.get(`${API_URL}/applications`, getAuthHeaders())
        return response.data
    } catch (err) {
        handleAuthError(err)
    }
}

export type NewApplication = {
    company: string,
    role: string,
    location: string,
    status: string,
    job_url: string,
    notes: string,
    salary: number | null,
    deadline: string | null,
}

export const createApplication = async (
    application: NewApplication
): Promise<Application> => {
    try {
        const response = await axios.post(`${API_URL}/applications`, application, getAuthHeaders())
        return response.data
    } catch (err) {
        handleAuthError(err)
    }
}

export const updateApplication = async (
    id: number,
    application: NewApplication
): Promise<Application> => {
    try {
    const response = await axios.put(`${API_URL}/applications/${id}`, application, getAuthHeaders())
    return response.data
    } catch (err) {
        handleAuthError(err)
    }
}

export const deleteApplication = async (
    id: number
): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/applications/${id}`, getAuthHeaders())
    } catch (err) {
        handleAuthError(err)
    }
}