import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Login from './components/Pages/Login/Login.tsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Login/>
        {/* <App /> */}
    </React.StrictMode>
);
