import { useEffect, useState } from "react";
import {
  getMyComments,
  deleteComment,
  updateComment,
} from "../api/commentApi";
import { useNavigate } from "react-router-dom";
import "../styles/MyComments.css";

export default function MyComments() {
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const nav = useNavigate();

  const load = async () => {
    const { data } = await getMyComments();
    setComments(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
    await deleteComment(id);
    load();
  };

  const handleEdit = async (id) => {
    if (!editText.trim()) return;
    await updateComment(id, { content: editText });
    setEditingId(null);
    setEditText("");
    load();
  };

  return (
    <div className="container" style={{ marginTop: 40 }}>
      <h2>내 댓글 관리</h2>
      <div className="mycomments-list">
        {comments.length === 0 ? (
          <p>작성한 댓글이 없습니다.</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="mycomment-item">
              <div className="comment-header">
                <span
                  className="comment-post-title"
                  onClick={() => nav(`/posts/${c.Post.id}`)}
                >
                  📰 {c.Post.title}
                </span>
                <span className="comment-date">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>

              {editingId === c.id ? (
                <div className="edit-area">
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="btn-row">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(c.id)}
                    >
                      저장
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => setEditingId(null)}
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="comment-content">{c.content}</p>
                  <div className="btn-row">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingId(c.id);
                        setEditText(c.content);
                      }}
                    >
                      수정
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(c.id)}
                    >
                      삭제
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
