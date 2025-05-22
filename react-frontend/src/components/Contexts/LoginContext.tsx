import React, { createContext, useState } from 'react';
import { ILoginForm } from '../Pages/Login/LoginForm/LoginFormTypes';

interface ILogin {
    form: "login" | "register"
}

export const loginInit: ILogin = {
    form: "login"
}

export interface ILoginContext {
    login: ILogin,
    setLogin: React.Dispatch<React.SetStateAction<ILogin>>
}

export const LoginContext = createContext<ILoginContext | undefined>(undefined);

const LoginProvider = ({ children }: any) => {
    const [login, setLogin] = useState<ILogin>(loginInit);
    return (
        <LoginContext.Provider value={{ login, setLogin}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider; 
