import { useEffect, useState } from "react";
import { getProfile, deleteAccount } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    getProfile().then((res) => setUser(res.data));
  }, []);

  const handleDelete = async () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      await deleteAccount();
      localStorage.clear();
      window.dispatchEvent(new Event("userChange"));
      alert("탈퇴 완료되었습니다.");
      nav("/");
    }
  };

  if (!user) return <p>불러오는 중...</p>;

  return (
    <div className="container" style={{ textAlign: "center", marginTop: 60 }}>
      <h2>내 프로필</h2>
      <p>이름: {user.name}</p>
      <p>아이디: {user.username}</p>
      <p>가입일: {new Date(user.createdAt).toLocaleDateString()}</p>
      <button className="outline" onClick={() => nav("/myposts")}>
        내 게시글 보기
      </button>
      <button
        className="login-button"
        style={{ marginLeft: 10 }}
        onClick={handleDelete}
      >
        회원탈퇴
      </button>
    </div>
  );
}
