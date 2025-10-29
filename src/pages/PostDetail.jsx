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

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ 로그인 정보 로드
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setRole(null);
      setIsLoggedIn(false);
    }
  }, []);

  // ✅ 데이터 로드
  const loadPost = async () => {
    const { data } = await getPost(id);
    setPost(data);
  };

  const loadComments = async () => {
    const { data } = await getComments(id);
    setComments(data);
  };

  useEffect(() => {
    loadPost();
    loadComments();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("게시글을 삭제하시겠습니까?")) return;
    await deletePost(id);
    nav("/posts");
  };

  if (!post) return <p>불러오는 중...</p>;

  const isOwner =
    isLoggedIn &&
    (post.userId === user?.id || post.User?.id === user?.id);
  const isAdmin = isLoggedIn && role === "admin";
  const canModify = isLoggedIn && (isOwner || isAdmin);

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p className="author">✍️ 작성자: {post.User?.name}</p>
      <div className="content">{post.content}</div>

      {/* ✅ 수정/삭제 버튼 */}
      {canModify && (
        <div className="button-group">
          <button className="edit-btn" onClick={() => nav(`/edit/${post.id}`)}>
            수정
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            삭제
          </button>
        </div>
      )}

      <div className="comments">
        <h3>댓글</h3>

        {comments.length === 0 ? (
          <p className="no-comment">아직 댓글이 없습니다.</p>
        ) : (
          comments.map((c) => {
            const canDeleteComment =
              isLoggedIn && (user?.id === c.userId || isAdmin);
            return (
              <div key={c.id} className="comment-item">
                <p className="comment-author">{c.User?.name}</p>
                <p className="comment-content">{c.content}</p>
                {canDeleteComment && (
                  <button
                    className="comment-delete"
                    onClick={() => handleCommentDelete(c.id)}
                  >
                    삭제
                  </button>
                )}
              </div>
            );
          })
        )}

        {isLoggedIn ? (
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
