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
    diasSeguidos: string,
    mediaHoras: string,
    feedBack: string
}

// export const rotinaInitMock: IRotina = {
//     id: 385,
//     title: "Math Study Plan",
//     description: "Weekly math schedule",
//     startDate: "2025-06-05T00:00:00",
//     endDate: "2025-06-12T23:59:00",
//     subjects: [
//         "Math"
//     ],
//     priorityTopics: [
//         "Algebra"
//     ],
//     dailyStudyHours: 2,
//     geminiGeneratedContent:
//         `
// {
//   "schedule": [
//     {
//       "date": "2025-06-05",
//       "subjects": [
//         {
//           "name": "Math",
//           "topics": ["Algebra"],
//           "timeSlots": "14:00-15:00",
//           "priority": "HIGH",
//           "methods": ["Videos", "Practice"]
//         },
//         {
//           "name": "Math",
//           "topics": ["Geometry"],
//           "timeSlots": "15:00-16:00",
//           "priority": "MEDIUM",
//           "methods": ["Practice"]
//         }
//       ]
//     },
//     {
//       "date": "2025-06-06",
//       "subjects": [
//         {
//           "name": "Math",
//           "topics": ["Calculus"],
//           "timeSlots": "14:00-15:00",
//           "priority": "HIGH",
//           "methods": ["Videos"]
//         },
//         {
//           "name": "Math",
//           "topics": ["Algebra - Review"],
//           "timeSlots": "15:00-16:00",
//           "priority": "MEDIUM",
//           "methods": ["Practice"]
//         }
//       ]
//     },
//     {
//       "date": "2025-06-07",
//       "subjects": [
//         {
//           "name": "Math",
//           "topics": ["Geometry - Review"],
//           "timeSlots": "14:00-15:00",
//           "priority": "MEDIUM",
//           "methods": ["Practice"]
//         },
//         {
//           "name": "Math",
//           "topics": ["Calculus - Review"],
//           "timeSlots": "15:00-16:00",
//           "priority": "HIGH",
//           "methods": ["Videos", "Practice"]
//         }
//       ]
//     },
//     {
//       "date": "2025-06-08",
//       "subjects": [
//         {
//           "name": "Math",
//           "topics": ["Practice Test 1"],
//           "timeSlots": "14:00-16:00",
//           "priority": "HIGH",
//           "methods": ["Practice"]
//         }
//       ]
//     },
//     {
//       "date": "2025-06-09",
//       "subjects": [
//         {
//           "name": "Math",
//           "topics": ["Algebra - Difficult Topics"],
//           "timeSlots": "14:00-15:00",
//           "priority": "HIGH",
//           "methods": ["Videos", "Practice"]
//         },
//         {
//           "name": "Math",
//           "topics": ["Geometry - Difficult Topics"],
//           "timeSlots": "15:00-16:00",
//           "priority": "HIGH",
//           "methods": ["Videos", "Practice"]
//         }
//       ]
//     },
//     {
//       "date": "2025-06-10",
//       "subjects": [
//         {
//           "name": "Math",
//           "topics": ["Calculus - Difficult Topics"],
//           "timeSlots": "14:00-15:00",
//           "priority": "HIGH",
//           "methods": ["Videos", "Practice"]
//         },
//         {
//           "name": "Math",
//           "topics": ["Practice Test 2"],
//           "timeSlots": "15:00-16:00",
//           "priority": "HIGH",
//           "methods": ["Practice"]
//         }
//       ]
//     },
//     {
//       "date": "2025-06-11",
//       "subjects": [
//         {
//           "name": "Math",
//           "topics": ["Final Review"],
//           "timeSlots": "14:00-16:00",
//           "priority": "HIGH",
//           "methods": ["Videos", "Practice"]
//         }
//       ]
//     },
//     {
//       "date": "2025-06-12",
//       "subjects": [
//         {
//           "name": "Math",
//           "topics": ["Last Minute Review"],
//           "timeSlots": "14:00-15:00",
//           "priority": "HIGH",
//           "methods": ["Practice"]
//         }
//       ]
//     }
//   ],
//   "importantSubjects": ["Math"],
//   "recommendations": "Prioritize practice tests and review difficult topics.  Ensure you understand the core concepts before moving on to more complex problems.  Use videos to supplement your understanding of the material."
// }
// `,
//     progress: 0,
//     objetivo: "Resumo de Conteudos Especificos",
//     tempoPorDia: '3',
//     diasSeguidos: '1',
//     mediaHoras: '2',
//     feedBack: ''
// }

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
