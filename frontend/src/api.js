// intercepter :
// It intercept any request means It'll automatically add header(authorization header) so we don't need to manually add it. 

import axios from "axios";
import { ACCESS_TOKEN } from './constants'

const apiURL = "/choreo-apis/djangoreactnotesapp/backend/rest-api-be2/v1.0"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiURL,
});
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default api;