import React, { createContext, useState } from 'react';

type TPage = "home" | "criarRotina" | "verRotina" | "updateProfile" 

interface IUserInfo {
    name: string,
    email: string,
    password: string,
    role: string,
    active: boolean
}

export const UserInfoInit: IUserInfo = {
    name: "",
    email: "",
    password: "",
    role: "",
    active: true
}

export interface IUserContext {
    userInfo: IUserInfo,
    setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo>>
    currentPage: TPage
    setCurrentPage: React.Dispatch<React.SetStateAction<TPage>>
}

export const UserContext = createContext<IUserContext | undefined>(undefined);

const UserProvider = ({ children }: any) => {
    const [userInfo, setUserInfo] = useState<IUserInfo>(UserInfoInit);
    const [currentPage, setCurrentPage] = useState<TPage>("home");
    return (
        <UserContext.Provider value={{ userInfo, setUserInfo, currentPage, setCurrentPage}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider; 
