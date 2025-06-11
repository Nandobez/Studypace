import React, { createContext, useState } from 'react';

type TStep = "1" | "2" | "3" | "4" | "5" | "6"

interface IStep2 {
    area: string,
    materias: Array<string>,
    topicos: Array<string>
}

interface IPrompt {
    step1: string,
    step2: IStep2,
    step3: number,
    step4: Date | undefined,
    step5: Array<string>,
    step6: {
        materiais: Array<string>,
        complementar: string,
    }
}

const promptInit: IPrompt = {
    step1: '',
    step2: {
        area: "",
        materias: [],
        topicos: []
    },
    step3: 0,
    step4: undefined,
    step5: [],
    step6: {
        materiais: [],
        complementar: ''
    }
}

export interface ICriarRotinaContext {
    step: TStep
    setStep: React.Dispatch<React.SetStateAction<TStep>>
    prompt: IPrompt,
    setPrompt: React.Dispatch<React.SetStateAction<IPrompt>>
}

export const CriarRotinaContext = createContext<ICriarRotinaContext | undefined>(undefined);

const CriarRotinaProvider = ({ children }: any) => {
    const [step, setStep] = useState<TStep>("1");
    const [prompt, setPrompt] = useState<IPrompt>(promptInit);
    return (
        <CriarRotinaContext.Provider value={{ step, setStep, prompt, setPrompt }}>
            {children}
        </CriarRotinaContext.Provider>
    )
}

export default CriarRotinaProvider; 
