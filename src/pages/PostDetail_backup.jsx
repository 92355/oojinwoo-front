import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, deletePost } from "../api/postApi";
import "../styles/PostDetail.css";

export default function PostDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getPost(id);
        setPost(data);
      } catch {
        setError("게시글을 불러올 수 없습니다.");
      }
    };
    load();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deletePost(id);
      alert("삭제되었습니다.");
      nav("/posts");
    } catch {
      alert("삭제 실패");
    }
  };

  if (error) return <p>{error}</p>;
  if (!post) return <p>불러오는 중...</p>;

  const isOwner = post.userId === user?.id || post.User?.id === user?.id;

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p className="author">✍️ 작성자: {post.User?.name}</p>
      <div className="content">{post.content}</div>

      {isOwner && (
        <div className="button-group">
          <button
            className="edit-btn"
            onClick={() => nav(`/edit/${post.id}`)}
          >
            수정
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            삭제
          </button>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <button className="back-btn" onClick={() => nav("/posts")}>
          목록으로
        </button>
      </div>
    </div>
  );
}
