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

export default function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myposts" element={<AuthRoute><MyPosts /></AuthRoute>} />
        <Route path="/mycomments" element={<AuthRoute><MyComments /></AuthRoute>} />
        <Route path="/profile" element={<AuthRoute><Profile /></AuthRoute>} />
        <Route path="/admin" element={<AuthRoute><AdminPage /></AuthRoute>} />
      </Routes>
    </HashRouter>
  );
}
