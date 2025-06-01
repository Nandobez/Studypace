import React, { createContext, useState } from 'react';

interface IRotina {
    area: string,
    objetivo: string,
    dataLimite: string | undefined,
    tempoPorDia: string,
    progresso: number,
    agenda: Array<string>,
    diasSeguidos: number,
    mediaHoras: number,
    feedback: string

}

const rotinaInitMock: IRotina = {
    area: "História",
    objetivo: "Melhorar notas na Escola",
    dataLimite: "17/06/2025 (2 meses)",
    tempoPorDia: "3 horas",
    progresso: 70,
    agenda: [
        "Assistir vídeo-aula sobre Sócrates (link do vídeo)",
        "Ler pdf sobre a Grécia Antiga (link do pdf)",
        "Realizar Atividade sobre a Grécia Antiga (link do formulário)"
    ],
    diasSeguidos: 7,
    mediaHoras: 2.8,
    feedback: "Você está tendo um desempenho paia, As vídeo-aulas estão em dia, mas pelo visto ler não é o seu forte ein hahaha!",
}

const rotinaInit: IRotina = {
    area: '',
    objetivo: '',
    dataLimite: undefined,
    tempoPorDia: '',
    progresso: 0,
    agenda: [],
    diasSeguidos: 0,
    mediaHoras: 0,
    feedback: ''
}

export interface IRotinaResumoContext {
    rotina: IRotina
    setRotina: React.Dispatch<React.SetStateAction<IRotina>>
}

export const RotinaResumoContext = createContext<IRotinaResumoContext | undefined>(undefined);

const RotinaResumoProvider = ({ children }: any) => {
    const [rotina, setRotina] = useState<IRotina>(rotinaInit);
    return (
        <RotinaResumoContext.Provider value={{ rotina, setRotina }}>
            {children}
        </RotinaResumoContext.Provider>
    )
}

export default RotinaResumoProvider; 
