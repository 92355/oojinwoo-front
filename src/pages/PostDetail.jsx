import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, deletePost } from "../api/postApi";
import { getComments, createComment, deleteComment } from "../api/commentApi";
import "../styles/PostDetail.css";

export default function PostDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const loadPost = async () => {
    try {
      const { data } = await getPost(id);
      setPost(data);
    } catch {
      setError("게시글을 불러올 수 없습니다.");
    }
  };

  const loadComments = async () => {
    const { data } = await getComments(id);
    setComments(data);
  };

  useEffect(() => {
    loadPost();
    loadComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      await createComment(id, { content: commentText });
      setCommentText("");
      loadComments();
    } catch {
      alert("댓글 작성 실패");
    }
  };

  const handleCommentDelete = async (cid) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      await deleteComment(cid);
      loadComments();
    } catch {
      alert("삭제 실패");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("게시글을 삭제하시겠습니까?")) return;
    await deletePost(id);
    nav("/posts");
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
          <button className="edit-btn" onClick={() => nav(`/edit/${post.id}`)}>
            수정
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            삭제
          </button>
        </div>
      )}

      {/* ✅ 댓글 영역 */}
      <div className="comments">
        <h3>댓글</h3>

        {comments.length === 0 ? (
          <p className="no-comment">아직 댓글이 없습니다.</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="comment-item">
              <p className="comment-author">{c.User?.name}</p>
              <p className="comment-content">{c.content}</p>
              {user?.id === c.userId && (
                <button
                  className="comment-delete"
                  onClick={() => handleCommentDelete(c.id)}
                >
                  삭제
                </button>
              )}
            </div>
          ))
        )}

        {user ? (
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              placeholder="댓글을 입력하세요"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            />
            <button className="edit-btn">등록</button>
          </form>
        ) : (
          <p className="login-hint">💡 로그인 후 댓글을 작성할 수 있습니다.</p>
        )}
      </div>
    </div>
  );
}
