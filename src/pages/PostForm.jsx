import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, getPost, updatePost } from "../api/postApi";
import "../styles/PostList.css";

export default function PostForm() {
  const { id } = useParams(); // edit 모드일 경우 id 존재
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ 수정 모드면 기존 데이터 불러오기
  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await getPost(id);
          setTitle(data.title);
          setContent(data.content);
        } catch (e) {
          console.error("게시글 불러오기 실패:", e);
        }
      })();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        // ✅ 수정 모드
        await updatePost(id, { title, content });
        alert("수정 완료!");
        nav(`/posts/${id}`);
      } else {
        // ✅ 새 글 작성
        await createPost({ title, content });
        alert("등록 완료!");
        nav("/posts");
      }
    } catch (e) {
      console.error("저장 실패:", e);
      alert("오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ marginTop: 40 }}>
      
      <h2>{id ? "게시글 수정" : "새 게시글 작성"}</h2>

      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="post-input"
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="post-textarea"
        />

        <button className="edit-btn" disabled={loading}>
          {loading ? "저장 중..." : id ? "수정 완료" : "등록"}
        </button>
      </form>
    </div>
  );
}
