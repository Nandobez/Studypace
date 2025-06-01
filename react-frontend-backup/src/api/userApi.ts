import axios from 'axios';
const API_URL = 'http://localhost:8080/api/users';
export const createUser = (data: any) => axios.post(API_URL, data).then(res => res.data);
export const updateUser = (id: any, data: any) => axios.put(`${API_URL}/${id}`, data).then(res => res.data);
export const deleteUser = (id: any) => axios.delete(`${API_URL}/${id}`);
export const sendPrompt = (data: any) => axios.post(`${API_URL}/prompt`, data).then(res => res.data);
