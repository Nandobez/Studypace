import { useState } from 'react';
import RegisterForm from './components/RegisterForm.jsx';
import Dashboard from './components/Dashboard.jsx';
import './App.css';

export default function App() {
    const [user, setUser] = useState(null);
    return (
        <div className="app-container">
        {!user
            ? <RegisterForm onRegister={setUser} />
            : <Dashboard user={user} onLogout={() => setUser(null)} onUpdate={setUser} />
        }
        </div>
    );
}
