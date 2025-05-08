import { useState } from 'react';
import { createUser } from '../api/userApi.js';
import './RegisterForm.css';

export default function RegisterForm({ onRegister }) {
    const [form, setForm] = useState({ name:'', email:'', password:'', role:'student', active:true });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
        const user = await createUser(form);
        onRegister(user);
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
        setError('Falha ao criar conta.');
        } finally {
        setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="register-form">
        <h2>Registrar</h2>
        {error && <div className="error">{error}</div>}
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nome" required />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Senha" required />
        <input name="role" value={form.role} onChange={handleChange} placeholder="Função" required />
        <label><input name="active" type="checkbox" checked={form.active} onChange={handleChange}/> Ativo</label>
        <button type="submit" disabled={loading}>{loading ? 'Criando...' : 'Criar Conta'}</button>
        </form>
    );
}
