import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { sendPrompt } from '../api/userApi.js';
import './StudyPlanner.css';

export default function StudyPlanner({ user }) {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [schedule, setSchedule] = useState([]);
    const [topics, setTopics] = useState([]);
    const [tab, setTab] = useState('roteiro');

    const parseResponse = text => {
        const lines = text.split('\n');
        const sched = [];
        const top = [];
        lines.forEach(line => {
        const m = line.match(/^[Dd]ia\s*(\d+):\s*(.*)/);
        if (m) sched.push({ day: parseInt(m[1],10), text: m[2] });
        else if (line.startsWith('- ')) top.push(line.substring(2));
        });
        setSchedule(sched);
        setTopics(top);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await sendPrompt({ email: user.email, password: user.password, prompt });
        setResponse(data.response);
        parseResponse(data.response);
    };

    return (
        <div className="study-planner">
        <h2>Plano de Estudo</h2>
        <form onSubmit={handleSubmit} className="prompt-form">
            <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Digite seu prompt" required />
            <button type="submit">Gerar Plano</button>
        </form>
        {response && <pre className="response-text">{response}</pre>}
        <div className="tabs">
            <button className={tab==='roteiro'? 'active':''} onClick={()=>setTab('roteiro')}>Roteiro</button>
            <button className={tab==='conteudos'? 'active':''} onClick={()=>setTab('conteudos')}>Conteúdos</button>
        </div>
        {tab==='roteiro' ? (
            <Calendar
            tileContent={({ date, view }) => view === 'month' && (
                <div className="tile-content">
                {schedule.filter(s=>s.day===date.getDate()).map((s,i)=> <p key={i}>{s.text}</p>)}
                </div>
            )}
            />
        ) : (
            <ul className="topics-list">
            {topics.map((t,i)=><li key={i}>{t}</li>)}
            </ul>
        )}
        </div>
    );
}
