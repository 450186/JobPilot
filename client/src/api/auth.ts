import axios from "axios";

const API_URL = "http://localhost:5001";

export type loginData = {
    username: string,
    password: string
}

export type registerData = {
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string
}

export const loginUser = async (data: loginData) => {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data
}

export const registerUser = async (data: registerData) => {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data
}