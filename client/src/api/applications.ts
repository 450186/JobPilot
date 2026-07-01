import axios from 'axios'
import type { Application } from '../types/Application'

const API_URL = 'http://localhost:5001'

export const getApplications = async (): Promise<Application[]> => {
    const response = await axios.get(`${API_URL}/applications`)
    return response.data
}