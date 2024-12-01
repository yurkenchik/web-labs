import axios from "axios";

export const API_URL = "http://localhost:8081";

export const $AUTHORIZED_API = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$AUTHORIZED_API.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("authToken")}`
    return config
});

export default $AUTHORIZED_API;