import api from "./authApi";

export const getPosts = () => api.get("/posts");
export const getPost = (id) => api.get(`/posts/${id}`);
export const createPost = (data) => api.post("/posts", data);
export const updatePost = (id, data) => api.put(`/posts/${id}`, data);
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const getMyPosts = () => api.get("/myposts");

export default api;
