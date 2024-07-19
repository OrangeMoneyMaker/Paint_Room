import axios from "axios";

const API_URL = "http://localhost:8080/api"
const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config: any)=>{
    const token = `Bearer ${localStorage.getItem('token')}`;
    config.headers.Authorization = token;
    return config;
});

export default $api;