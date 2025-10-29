import axios from "axios";

const api = axios.create({
  baseURL: "https://oojinwoo-server.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const loginRequest = async (data) => {
  const res = await api.post("/login", data);
  const { token, user } = res.data;

  // ✅ 로그인 시 토큰 + role 저장
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("role", user?.role || "user");

  return res;
};

export const getProfile = () => api.get("/profile");
export const deleteAccount = () => api.delete("/profile");
export default api;
