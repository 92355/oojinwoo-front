import { useEffect, useState } from "react";
import { getPosts } from "../api/postApi";
import { Link } from "react-router-dom";
import "../styles/PostList.css";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="container" style={{ marginTop: 40 }}>
      <h2>게시글 목록</h2>
      <div className="post-list">
        {posts.length === 0 ? (
          <p>게시글이 없습니다.</p>
        ) : (
          posts.map((p) => (
            <Link
              key={p.id}
              to={`/posts/${p.id}`}
              className="post-item-link"
            >
              <div className="post-item">
                <h3>{p.title}</h3>
                <p className="post-author">
                  ✍️ 작성자: {p.User?.name || "알 수 없음"}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
