import React, { useContext } from "react";
import './App.css';
import Login from './components/Pages/Login/Login.js';
import { UserContext, IUserContext } from './components/Contexts/UserContext.js'
import LoginProvider from "./components/Contexts/LoginContext.js";
import Dashboard from "./components/Pages/Dashboard/Dashboard";

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './types/theme';

export default function App() {
    const userContext = useContext(UserContext) as IUserContext;
    return (
        <div className="app-container">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {!userContext.userInfo.name
                    ?
                    <LoginProvider>
                        <Login />
                    </LoginProvider>
                    :
                    <Dashboard />
                }
            </ThemeProvider>
        </div>

    );
}
