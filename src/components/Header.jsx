import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState, useRef } from "react";
import "../styles/Header.css";

export default function Header() {
  const nav = useNavigate();
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // 로그인 상태 감지
  useEffect(() => {
    const handleChange = () => {
      const saved = localStorage.getItem("user");
      setUser(saved ? JSON.parse(saved) : null);
    };
    window.addEventListener("userChange", handleChange);
    return () => window.removeEventListener("userChange", handleChange);
  }, []);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("userChange"));
    nav("/");
  };

  return (
    <header className="header">
      <div className="header-inner">
        {/* 로고 */}
        <h1 className="header-logo" onClick={() => nav("/")}>
          OOJINWOO
        </h1>

        {/* 네비게이션 */}
        <nav className="header-nav">
          <Link to="/posts">게시글</Link>
          <Link to="/write">등록</Link>

          {user ? (
            <div className="dropdown" ref={ref}>
              <div
                className="avatar"
                onClick={() => setOpen((prev) => !prev)}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div className={`dropdown-menu ${open ? "open" : ""}`}>
                <div className="dropdown-user">{user.name}</div>
                <button onClick={() => nav("/profile")}>내 프로필</button>
                <button onClick={() => nav("/myposts")}>내 게시글</button>
                 <button onClick={() => nav("/mycomments")}>내 댓글</button>
                <button onClick={handleLogout}>로그아웃</button>
                <text>관리자권한 생겨라</text>
                {/* ✅ 관리자 메뉴 */}
                {localStorage.getItem("role") === "admin" && (
                    <>
                      <hr style={{ margin: "6px 0" }} />
                      <button onClick={() => nav("/admin")}>관리자 페이지</button>
                    </>
                  )}

                <button style={{ color: "crimson" }} onClick={() => nav("/profile")}>회원탈퇴 </button>
              </div>
            </div>
          ) : (
             <Link to="/login">로그인 / 회원가입</Link>
          )}

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
