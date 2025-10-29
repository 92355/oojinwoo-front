import axios from "axios";

const api = axios.create({
  baseURL: "https://oojinwoo-server.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


// ✅ 회원가입
export const registerRequest = (data) => api.post("/register", data);

// ✅ 로그인
export const loginRequest = async (data) => {
  const res = await api.post("/login", data);
  const { token, user } = res.data;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("role", user?.role || "user");

  // ✅ 같은 탭에서도 Header가 갱신되게 이벤트 발송
  window.dispatchEvent(new Event("userChange"));

  return res;
};


// ✅ 프로필 관련
export const getProfile = () => api.get("/profile");
export const deleteAccount = () => api.delete("/profile");

export default api;
