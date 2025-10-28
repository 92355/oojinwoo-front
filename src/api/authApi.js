import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const registerRequest = (data) => api.post("/register", data);
export const loginRequest = (data) => api.post("/login", data);
export const getProfile = () => api.get("/profile");
export const deleteAccount = () => api.delete("/profile");

export default api; // ✅ 반드시 추가
