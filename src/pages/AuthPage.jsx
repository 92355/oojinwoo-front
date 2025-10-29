import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest, registerRequest } from "../api/authApi";
import "../styles/Login.css";
import "../styles/AuthPage.css"; 

export default function AuthPage() {
  const nav = useNavigate();
  const [isLogin, setIsLogin] = useState(true); 
  const [form, setForm] = useState({ username: "", password: "", name: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    setError("");
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        
        const { data } = await loginRequest({
          username: form.username,
          password: form.password,
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("userChange"));
        nav("/posts");
      } else {
        
        await registerRequest(form);
        const { data } = await loginRequest({
          username: form.username,
          password: form.password,
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("userChange"));
        nav("/posts");
      }
    } catch (err) {
      setError(err.response?.data?.error || "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${isLogin ? "show-login" : "show-register"}`}>
        <div className="auth-panel login-panel">
          <h2>로그인</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              className="login-input"
              name="username"
              placeholder="아이디"
              value={form.username}
              onChange={handleChange}
              required
            />
            <input
              className="login-input"
              type="password"
              name="password"
              placeholder="비밀번호"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button className="login-button" disabled={loading}>
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </form>
          {error && <p className="login-error">{error}</p>}
          <button className="register-button" onClick={toggleMode}>
            회원가입으로 이동
          </button>
        </div>

        <div className="auth-panel register-panel">
          <h2>회원가입</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              className="login-input"
              name="name"
              placeholder="이름"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              className="login-input"
              name="username"
              placeholder="아이디"
              value={form.username}
              onChange={handleChange}
              required
            />
            <input
              className="login-input"
              type="password"
              name="password"
              placeholder="비밀번호"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button className="login-button" disabled={loading}>
              {loading ? "가입 중..." : "회원가입"}
            </button>
          </form>
          {error && <p className="login-error">{error}</p>}
          <button className="register-button" onClick={toggleMode}>
            로그인으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
