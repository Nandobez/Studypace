import axios from 'axios';
const API_URL = 'http://localhost:8080/api/users';
export const createUser = data => axios.post(API_URL, data).then(res => res.data);
export const updateUser = (id, data) => axios.put(`${API_URL}/${id}`, data).then(res => res.data);
export const deleteUser = id => axios.delete(`${API_URL}/${id}`);
export const sendPrompt = data => axios.post(`${API_URL}/prompt`, data).then(res => res.data);
