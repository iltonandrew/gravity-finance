import axios from "axios"
import { BASE_URL } from "../pages/api/constants"
import { parseCookies } from 'nookies';

const { token } = parseCookies();

export const api = axios.create({
    baseURL: BASE_URL
})

if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
}



