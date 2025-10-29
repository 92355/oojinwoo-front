import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState, useRef } from "react";
import "../styles/Header.css";

export default function Header() {
  const nav = useNavigate();
  const ref = useRef(null);

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [open, setOpen] = useState(false);

  // ✅ 로그인 정보 로드 및 동기화
  useEffect(() => {
    const loadUser = () => {
      const savedUser = localStorage.getItem("user");
      const savedRole = localStorage.getItem("role");
      setUser(savedUser ? JSON.parse(savedUser) : null);
      setRole(savedRole || null);
    };

    loadUser();
    window.addEventListener("storage", loadUser);
    window.addEventListener("userChange", loadUser);
    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("userChange", loadUser);
    };
  }, []);

  // ✅ 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setRole(null);
    setOpen(false);
    nav("/");
  };

  return (
    <header className="header">
      <div className="header-inner">
        {/* ✅ 로고 */}
        <h1 className="header-logo" onClick={() => nav("/")}>
          OOJINWOO
        </h1>

        {/* ✅ 네비게이션 + 프로필 묶음 */}
        <div className="nav-group">
          <nav className="header-nav">
            <Link to="/posts">목록</Link>
            <Link to="/write">글쓰기</Link>

            {user ? (
              <div className="dropdown" ref={ref}>
                <div
                  className="avatar"
                  onClick={() => setOpen((prev) => !prev)}
                  title={user.name}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>

                {open && (
                  <div className="dropdown-menu open">
                    <div className="dropdown-user">{user.name}</div>
                    <button onClick={() => nav("/profile")}>내 프로필</button>
                    <button onClick={() => nav("/myposts")}>내 게시글</button>
                    <button onClick={() => nav("/mycomments")}>내 댓글</button>
                    {role === "admin" && (
                      <>
                        <hr style={{ margin: "6px 0" }} />
                        <button onClick={() => nav("/admin")}>
                          관리자 페이지
                        </button>
                      </>
                    )}
                    <hr style={{ margin: "6px 0" }} />
                    <button onClick={handleLogout}>로그아웃</button>
                    <button
                      style={{ color: "crimson" }}
                      onClick={() => nav("/profile")}
                    >
                      회원탈퇴
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">로그인 / 회원가입</Link>
            )}
          </nav>

          {/* ✅ 테마 토글은 nav 옆으로 분리 */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
