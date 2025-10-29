import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../api/postApi";
import "../styles/PostList.css";

export default function AdminPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("관리자 전용 페이지입니다.");
      window.location.href = "/";
      return;
    }

    getPosts().then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="container" style={{ marginTop: 40 }}>
      <h2>🛠 관리자 페이지</h2>
      {posts.map((p) => (
        <div key={p.id} className="post-item mypost-item">
          <div>
            <strong>{p.title}</strong>
            <p className="post-author">작성자: {p.User?.name}</p>
          </div>
          <button
            className="delete-btn"
            onClick={async () => {
              if (window.confirm("삭제하시겠습니까?")) {
                await deletePost(p.id);
                setPosts(posts.filter((x) => x.id !== p.id));
              }
            }}
          >
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}
