import axios from 'axios';
import { BASE_URL } from '../constant/index.js';

const instance = axios.create({
	baseURL: BASE_URL,
});

const readPosts = async () =>
	instance
		.get('/posts')
		.then(({ data }) => data)
		.catch((error) => error.response);

const readPost = async (postId) => instance.get(`/posts/${postId}`);

const createPost = async (data) => instance.post(`/post`, data);

const updatePost = async (postId, data) => instance.patch(`/posts/${postId}`, data);

const deletePost = async (postId) => instance.delete(`/posts/${postId}`);

const createComment = async (postId, data) => instance.post(`/comment/${postId}`, data);

const deleteComment = async (commentId) => instance.delete(`/comment/${commentId}`);

export { readPosts, readPost, createPost, updatePost, deletePost, createComment, deleteComment };
