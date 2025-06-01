import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Login from './components/Pages/Login/Login.tsx';
import UserProvider from './components/Contexts/UserContext.tsx';
import Dashboard from './components/Dashboard.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
        {/* <Dashboard/> */}
    </React.StrictMode>
);
