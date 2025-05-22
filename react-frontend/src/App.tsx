import React, { useContext } from "react";
import './App.css';
import Login from './components/Pages/Login/Login.js';
import { UserContext, IUserContext } from './components/Contexts/UserContext.js'
import LoginProvider from "./components/Contexts/LoginContext.js";
import Dashboard from "./components/Pages/Dashboard/Dashboard";

export default function App() {
    const userContext = useContext(UserContext) as IUserContext;
    return (
        <div className="app-container">
            {!userContext.userInfo.name
                ?
                <LoginProvider>
                    <Login />
                </LoginProvider>
                :
                <Dashboard/>
            }
        </div>
    );
}
