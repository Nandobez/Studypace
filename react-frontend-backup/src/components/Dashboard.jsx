import React, { useContext } from "react";
import UpdateForm from './UpdateForm.jsx';
import StudyPlanner from './StudyPlanner.jsx';
import './Dashboard.css';
import { UserContext } from './Contexts/UserContext'

const Dashboard = () => {
    const user = useContext(UserContext);
    return (
        <div className="dashboard">
            <header>
                <h1>Bem-vindo, {user.name}</h1>
                <button >Logout</button>
            </header>
            <UpdateForm user={user} />
            <StudyPlanner user={user} />
        </div>
    );
}

export default Dashboard;
