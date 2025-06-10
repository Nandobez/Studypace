import React, { createContext, useState } from 'react';

interface IRotina {
    id: number,
    title: string,
    description: string,
    startDate: Date | string,
    endDate: Date | string,
    subjects: Array<string>,
    priorityTopics: Array<string>,
    dailyStudyHours: number,
    geminiGeneratedContent: string,

    objetivo: string,
    progress: number,
    tempoPorDia: string,
    diasSeguidos: string,
    mediaHoras: string,
    feedBack: string
}

export const rotinaInitMock: IRotina = {
    id: 385,
    title: "Math Study Plan",
    description: "Weekly math schedule",
    startDate: "2025-06-05T00:00:00",
    endDate: "2025-06-12T23:59:00",
    subjects: [
        "Math"
    ],
    priorityTopics: [
        "Algebra"
    ],
    dailyStudyHours: 2,
    geminiGeneratedContent: 
    "[Formatted] Gemini feedback: ```json\n {\n  \"schedule\": [\n    {\n      \"date\": \"2025-06-05\",\n      \"subjects\": [\n        {\n          \"name\": \"Math\",\n          \"topics\": [\"Algebra\"],\n          \"timeSlots\": \"14:00-15:00\",\n          \"priority\": \"HIGH\",\n          \"methods\":[\"Videos\", \"Practice\"]\n        },\n        {\n          \"name\": \"Math\",\n          \"topics\": [\"Geometry\"],\n          \"timeSlots\": \"15:00-16:00\",\n          \"priority\": \"MEDIUM\",\n          \"methods\":[\"Practice\"]\n        }\n      ]\n    },\n    {\n      \"date\": \"2025-06-06\",\n      \"subjects\": [\n        {\n          \"name\": \"Math\",\n          \"topics\": [\"Calculus\"],\n          \"timeSlots\": \"14:00-15:00\",\n          \"priority\": \"HIGH\",\n          \"methods\":[\"Videos\"]\n        },\n        {\n          \"name\": \"Math\",\n          \"topics\": [\"Algebra - Review\"],\n          \"timeSlots\": \"15:00-16:00\",\n          \"priority\": \"MEDIUM\",\n          \"methods\":[\"Practice\"]\n        }\n      ]\n    },\n    {\n      \"date\": \"2025-06-07\",\n      \"subjects\": [\n        {\n          \"name\": \"Math\",\n          \"topics\": [\"Geometry - Review\"],\n          \"timeSlots\": \"14:00-15:00\",\n          \"priority\": \"MEDIUM\",\n          \"methods\":[\"Practice\"]\n        },\n        {\n          \"name\": \"Math\",\n          \"topics\": [\"Calculus - Review\"],\n          \"timeSlots\": \"15:00-16:00\",\n          \"priority\": \"HIGH\",\n          \"methods\":[\"Videos\", \"Practice\"]\n        }\n      ]\n    },\n    {\n      \"date\": \"2025-06-08\",\n      \"subjects\": [\n        {\n          \"name\": \"Math\",\n          \"topics\": [\"Practice Test 1\"],\n          \"timeSlots\": \"14:00-16:00\",\n          \"priority\": \"HIGH\",\n          \"methods\":[\"Practice\"]\n        }\n      ]\n    },\n    {\n      \"date\": \"2025-06-09\",\n      \"subjects\": [\n        {\n          \"name\": \"Math\",\n          \"topics\": [\"Algebra - Difficult Topics\"],\n          \"timeSlots\": \"14:00-15:00\",\n          \"priority\": \"HIGH\",\n          \"methods\":[\"Videos\", \"Practice\"]\n        },\n        {\n          \"name\": \"Math\",\n          \"topics\": [\"Geometry - Difficult Topics\"],\n          \"timeSlots\": \"15:00-16:00\",\n          \"priority\": \"HIGH\",\n          \"methods\":[\"Videos\", \"Practice\"]\n        }\n      ]\n    },\n    {\n      \"date\": \"2025-06-10\",\n      \"subjects\": [\n        {\n          \"name\": \"Math\",\n          \"topics\": [\"Calculus - Difficult Topics\"],\n          \"timeSlots\": \"14:00-15:00\",\n          \"priority\": \"HIGH\",\n          \"methods\":[\"Videos\", \"Practice\"]\n        },\n        {\n          \"name\": \"Math\",\n          \"topics\": [\"Practice Test 2\"],\n          \"timeSlots\": \"15:00-16:00\",\n          \"priority\": \"HIGH\",\n          \"methods\":[\"Practice\"]\n        }\n      ]\n    },\n    {\n      \"date\": \"2025-06-11\",\n      \"subjects\": [\n        {\n          \"name\": \"Math\",\n          \"topics\": [\"Final Review\"],\n          \"timeSlots\": \"14:00-16:00\",\n          \"priority\": \"HIGH\",\n          \"methods\":[\"Videos\", \"Practice\"]\n        }\n      ]\n    },\n    {\n      \"date\": \"2025-06-12\",\n      \"subjects\": [\n        {\n          \"name\": \"Math\",\n          \"topics\": [\"Last Minute Review\"],\n          \"timeSlots\": \"14:00-15:00\",\n          \"priority\": \"HIGH\",\n          \"methods\":[\"Practice\"]\n        }\n      ]\n    }\n  ],\n  \"importantSubjects\": [\"Math\"],\n  \"recommendations\": \"Prioritize practice tests and review difficult topics.  Ensure you understand the core concepts before moving on to more complex problems.  Use videos to supplement your understanding of the material.\"\n}\n```\n",
    
    progress: 0,
    objetivo: "Resumo de Conteudos Especificos",
    tempoPorDia: '3',
    diasSeguidos: '1',
    mediaHoras: '2',
    feedBack: ''
}

const rotinaInit: IRotina = {
    id: 0,
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    subjects: [],
    priorityTopics: [],
    dailyStudyHours: 0,
    geminiGeneratedContent: '',

    progress: 0,
    objetivo: '',
    tempoPorDia: '',
    diasSeguidos: '',
    mediaHoras: '',
    feedBack: ''
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
