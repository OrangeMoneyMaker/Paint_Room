import axios from "axios";

const API_URL = "http://localhost:8080/api";
const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config: any) => {
  const token = `Bearer ${localStorage.getItem("token")}`;
  config.headers.Authorization = token;
  return config;
});

$api.interceptors.response.use(
  (config: any) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.access_token);
        $api.request(originalRequest);
      } catch (e) {}
    }
    throw error;
  }
);

export default $api;
