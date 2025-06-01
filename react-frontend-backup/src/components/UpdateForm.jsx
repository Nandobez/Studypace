import { useState } from 'react';
import { updateUser, deleteUser } from '../api/userApi.js';
import './UpdateForm.css';

export default function UpdateForm({ user, onUpdate }) {
    const [form, setForm] = useState({ ...user });
    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.type==='checkbox'?e.target.checked:e.target.value });
    const handleUpdate = async e => { e.preventDefault(); onUpdate(await updateUser(user.id, form)); };
    const handleDelete = async () => { await deleteUser(user.id); onUpdate(null); };
    return (
        <form onSubmit={handleUpdate} className="update-form">
        <h2>Atualizar Perfil</h2>
        <input name="name" value={form.name} onChange={handleChange} />
        <input name="email" type="email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" value={form.password} onChange={handleChange} />
        <input name="role" value={form.role} onChange={handleChange} />
        <label><input type="checkbox" name="active" checked={form.active} onChange={handleChange}/> Ativo</label>
        <div className="actions">
            <button type="submit">Salvar</button>
            <button type="button" onClick={handleDelete}>Excluir Conta</button>
        </div>
        </form>
    );
}
