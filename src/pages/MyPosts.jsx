import { useEffect, useState } from "react";
import { getMyPosts, deletePost } from "../api/postApi";
import { useNavigate } from "react-router-dom";
import "../styles/PostList.css";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const nav = useNavigate();

  const load = async () => {
    const { data } = await getMyPosts();
    setPosts(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("삭제하시겠습니까?")) return;
    await deletePost(id);
    load();
  };

  return (
    <div className="container" style={{ marginTop: 40 }}>
      <h2>내 게시글</h2>
      <div className="post-list">
        {posts.length === 0 ? (
          <p>작성한 글이 없습니다.</p>
        ) : (
          posts.map((p) => (
            <div key={p.id} className="post-item mypost-item">
              <div>
                <h3>{p.title}</h3>
                <p className="post-author">
                  ✍️ 작성일: {new Date(p.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="mypost-buttons">
                <button
                  className="edit-btn"
                  onClick={() => nav(`/edit/${p.id}`)}
                >
                  수정
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(p.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
