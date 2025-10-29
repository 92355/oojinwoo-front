import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PostList from "./pages/PostList";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyPosts from "./pages/MyPosts";
import MyComments from "./pages/MyComments";
import Profile from "./pages/Profile";
import AuthRoute from "./components/AuthRoute";
import AdminPage from "./pages/AdminPage";
import PostForm from "./pages/PostForm"; // ✅ 추가

export default function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        {/* ✅ 메인 페이지 */}
        <Route path="/" element={<PostList />} />

        {/* ✅ 게시글 목록 페이지 (누락된 부분 추가) */}
        <Route path="/posts" element={<PostList />} />

        {/* ✅ 게시글 상세 페이지 */}
        <Route path="/posts/:id" element={<PostDetail />} />

         {/* ✅ PostForm을 글쓰기/수정 모두에 재사용 */}
        <Route path="/write" element={<AuthRoute><PostForm /></AuthRoute>} />
        <Route path="/edit/:id" element={<AuthRoute><PostForm /></AuthRoute>} />
        
        {/* ✅ 인증 관련 */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ 내 활동 */}
        <Route path="/myposts" element={<AuthRoute><MyPosts /></AuthRoute>} />
        <Route path="/mycomments" element={<AuthRoute><MyComments /></AuthRoute>} />
        <Route path="/profile" element={<AuthRoute><Profile /></AuthRoute>} />

        {/* ✅ 관리자 페이지 */}
        <Route path="/admin" element={<AuthRoute><AdminPage /></AuthRoute>} />
      </Routes>
    </HashRouter>
  );
}
