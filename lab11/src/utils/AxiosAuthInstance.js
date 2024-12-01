import axios from "axios";

export const API_URL = "http://localhost:8081/api";

export const $AUTHORIZED_API = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$AUTHORIZED_API.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
});

export default $AUTHORIZED_API;