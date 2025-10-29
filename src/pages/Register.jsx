import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest, loginRequest } from "../api/authApi";
import "../styles/Login.css"; 

export default function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      
      await registerRequest(form);

      
      const { data } = await loginRequest({
        username: form.username,
        password: form.password,
      });

     
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

     
      window.dispatchEvent(new Event("userChange"));

  
      nav("/posts");
    } catch (err) {
      setError(err.response?.data?.error || "회원가입 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
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

        <button
          className="register-button"
          onClick={() => nav("/")}
          style={{ marginTop: 20 }}
        >
          로그인으로 돌아가기
        </button>
      </div>
    </div>
  );
}
