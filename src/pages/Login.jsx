import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api/authApi";
import "../styles/Login.css";

export default function Login() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await loginRequest({ username, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("userChange"));
      nav("/posts");
    } catch (err) {
      setError(err.response?.data?.error || "로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>로그인</h2>

        <form onSubmit={handleLogin} className="login-form">
          <input
            className="login-input"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <input
            className="login-input"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button className="login-button" disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        {error && <p className="login-error">{error}</p>}

        <button className="register-button" onClick={() => nav("/register")}>
          회원가입
        </button>
      </div>
    </div>
  );
}
