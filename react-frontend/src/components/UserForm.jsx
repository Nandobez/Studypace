import { useState } from 'react';
import axios from 'axios';

function UserForm({ onUserCreated }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [active, setActive] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Dados do usuário
        const user = {
            name,
            email,
            role,
            active,
            password,
        };

        try {
            // Envia a solicitação POST para o backend
            await axios.post('http://localhost:8080/api/users', user);
            onUserCreated(); // Atualiza a lista de usuários no frontend
            // Limpa os campos após o envio
            setName('');
            setEmail('');
            setRole('');
            setPassword('');
            setActive(true);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Role:</label>
                <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Active:</label>
                <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                />
            </div>
            <button type="submit">Criar Usuário</button>
        </form>
    );
}

export default UserForm;
