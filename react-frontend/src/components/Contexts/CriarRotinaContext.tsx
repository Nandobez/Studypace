import React, { createContext, useState } from 'react';

type TStep = "1" | "2" | "3" | "4" | "5" | "6"

interface IPrompt {
    step1: string,
    step2: string,
    step3: string,
    step4: string | undefined,
    step5: Array<string>,
    step6: {
        materiais: Array<string>,
        complementar: string,
    }
}

const promptInit: IPrompt = {
    step1: '',
    step2: '',
    step3: '',
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
