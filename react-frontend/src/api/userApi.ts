import axios from 'axios';

const AUTH_API_URL = 'http://localhost:8080/api/auth';

export const register = (data: any) =>
    axios.post(`${AUTH_API_URL}/register`, data).then(res => res.data);
  
export const login = (data: any) =>
    axios.post(`${AUTH_API_URL}/login`, data).then(res => res.data);
  
export const loginUser = (data: { email: string, password: string }) =>
    axios.post(`${AUTH_API_URL}/login`, data)
      .then(res => res.data); 
  



const API_URL = 'http://localhost:8080/api/users';
const API_PROMPT = 'http://localhost:8080/api/study/${id}/schedule'



export const createUser = (data: any) => axios.post(API_URL, data).then(res => res.data);
export const updateUser = (id: any, data: any) => axios.put(`${API_URL}/${id}`, data).then(res => res.data);
export const deleteUser = (id: any) => axios.delete(`${API_URL}/${id}`);

export const sendPrompt = (data: any, id: any, token: string) => {
    console.log(data)

    return axios.post(
        `http://localhost:8080/api/study/${id}/schedule`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    ).then(res => res.data);
};
