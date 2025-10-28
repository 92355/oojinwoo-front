import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PostList from "./pages/PostList";
import PostDetail from "./pages/PostDetail";
import PostForm from "./pages/PostForm";
import Profile from "./pages/Profile";
import MyPosts from "./pages/MyPosts";
import MyComments from "./pages/MyComments";
import AuthPage from "./pages/AuthPage";
import AuthRoute from "./components/AuthRoute";

export default function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        {/* ✅ 게시글 목록 — /와 /posts 모두 PostList 표시 */}
        <Route path="/" element={<PostList />} />
        <Route path="/posts" element={<PostList />} />  {/* ✅ 추가 */}

        {/* ✅ 게시글 상세 */}
        <Route path="/posts/:id" element={<PostDetail />} />

        {/* ✅ 로그인 필요 */}
        <Route
          path="/write"
          element={
            <AuthRoute>
              <PostForm />
            </AuthRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <AuthRoute>
              <PostForm />
            </AuthRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />
        <Route
          path="/myposts"
          element={
            <AuthRoute>
              <MyPosts />
            </AuthRoute>
          }
        />
        <Route
          path="/mycomments"
          element={
            <AuthRoute>
              <MyComments />
            </AuthRoute>
          }
        />

        {/* 로그인 / 회원가입 */}
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </HashRouter>
  );
}
