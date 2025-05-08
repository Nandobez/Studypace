import UpdateForm from './UpdateForm.jsx';
import StudyPlanner from './StudyPlanner.jsx';
import './Dashboard.css';

export default function Dashboard({ user, onLogout, onUpdate }) {
    return (
        <div className="dashboard">
        <header>
            <h1>Bem-vindo, {user.name}</h1>
            <button onClick={onLogout}>Logout</button>
        </header>
        <UpdateForm user={user} onUpdate={onUpdate} />
        <StudyPlanner user={user} />
        </div>
    );
}
