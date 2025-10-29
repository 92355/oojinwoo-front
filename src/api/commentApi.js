import api from "./authApi";

export const getComments = (postId) => api.get(`/posts/${postId}/comments`);
export const createComment = (postId, data) =>
  api.post(`/posts/${postId}/comments`, data);
export const deleteComment = (id) => api.delete(`/comments/${id}`);
export const updateComment = (id, data) => api.put(`/comments/${id}`, data);


export const getMyComments = () => api.get("/mycomments");
