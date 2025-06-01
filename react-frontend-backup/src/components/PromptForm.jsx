import { useState } from 'react';
import { sendPrompt } from '../api/userApi.js';
import './PromptForm.css';

export default function PromptForm({ user }) {
    const [prompt, setPrompt] = useState('');
    const [resp, setResp] = useState('');
    const handleSubmit = async e => {
        e.preventDefault();
        const data = await sendPrompt({ email:user.email, password:user.password, prompt });
        setResp(data.response);
    };
    return (
        <div className="prompt-form">
        <h2>Enviar Prompt</h2>
        <form onSubmit={handleSubmit}>
            <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Digite seu prompt" required />
            <button type="submit">Enviar</button>
        </form>
        {resp && <pre className="response">{resp}</pre>}
        </div>
    );
}
