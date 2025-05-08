import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Requisição GET para o backend
        axios.get("http://localhost:8080/api/users")
            .then(response => {
                setUsers(response.data);  // Atualiza o estado com os usuários recebidos
            })
            .catch(error => {
                console.error("Erro ao buscar os usuários:", error);
            });
    }, []);

    return (
        <div>
            <h1>Lista de Usuários</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
