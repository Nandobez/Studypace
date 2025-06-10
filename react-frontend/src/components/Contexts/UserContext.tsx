import React, { createContext, useState } from 'react';

type TPage = "home" | "criarRotina" | "verRotina" | "updateProfile"

interface IUserInfo {
    user: {
        accountNonExpired: boolean
        accountNonLocked: boolean
        active: boolean
        authorities: Array<{authority: string}>
        credentialsNonExpired: boolean
        email: string
        enabled: boolean
        id: number
        name: string
        observers: Array<string>
        password: null
        preferences: { id: number, studyGoals: string, preferredSubjects: string, dailyStudyHours: number },
        role: string,
        studentRelations: Array<string>,
        studyLevel: string,
        username: string,
    }
    token: string
}

export const UserInfoInit: IUserInfo = {
    user: {
        accountNonExpired: false,
        accountNonLocked: false,
        active: false,
        authorities: [],
        credentialsNonExpired: false,
        email: '',
        enabled: false,
        id: 0,
        name: '',
        observers: [],
        password: null,
        preferences: {
            id: 0,
            studyGoals: '',
            preferredSubjects: '',
            dailyStudyHours: 0
        },
        role: '',
        studentRelations: [],
        studyLevel: '',
        username: ''
    },
    token: ''
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
        <UserContext.Provider value={{ userInfo, setUserInfo, currentPage, setCurrentPage }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider; 
