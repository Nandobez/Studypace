import { Typography, ToggleButtonGroup, ToggleButton, TextField, Stack, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext, IUserContext } from "../../../Contexts/UserContext";
import { CriarRotinaContext, ICriarRotinaContext } from "../../../Contexts/CriarRotinaContext";

const Step1 = () => {
    const userContext = useContext(UserContext) as IUserContext;
    const CriarRotina = useContext(CriarRotinaContext) as ICriarRotinaContext;

    const [objetivo, setObjetivo] = useState<string>("");
    const [outroTexto, setOutroTexto] = useState('');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newObjetivo: string
    ) => {
        setObjetivo(newObjetivo);
        if (newObjetivo !== 'Outro') setOutroTexto('');
    };

    const handleNext = () => {
        const resultado = objetivo === 'Outro' ? outroTexto : objetivo;
        CriarRotina.setPrompt(prev => ({ ...prev, step1: resultado }))
        CriarRotina.setStep("2")
        console.log('Objetivo escolhido:', resultado);
    };

    return (
        <>
            <Typography variant="body1" color="white" mb={2} textAlign={"left"} sx={{textShadow: '4px 4px 0px rgb(0, 0, 0)'}}>
                Qual é o seu principal objetivo de estudo?
            </Typography>

            <ToggleButtonGroup
                orientation="vertical"
                value={objetivo}
                exclusive
                onChange={handleChange}
                fullWidth
                sx={{
                    gap: 1,
                    // boxShadow: '4px 4px 0px #ffcc34'
                }} // espaçamento entre botões
            >
                {[
                    "Melhorar notas na escola/faculdade",
                    "Se preparar para um concurso/exame",
                    "Aprender uma nova habilidade",
                    "Revisão de conteúdos específicos",
                    "Outro"
                ].map((label) => (
                    <ToggleButton
                        key={label}
                        value={label}
                        sx={{
                            backgroundColor: objetivo === label ? 'rgb(255, 255, 255)' : '#004c6d',
                            color: objetivo === label ? 'rgb(255, 255, 255)' : '#ffffff',
                            fontWeight: 'bold',
                            boxShadow: '4px 4px 0px #ffcc34',
                            border: 'none',
                            '&:hover': {
                                backgroundColor: objetivo === label ? '#fff' : '#08344c',
                                color: objetivo === label ? 'rgb(255, 255, 255)' : 'rgb(255, 255, 255)',
                                boxShadow: "none"
                            },
                            '&.Mui-selected': {
                                color: 'rgb(255, 255, 255)',
                                backgroundColor: "#08344c",
                                boxShadow: "none"
                            }
                        }}
                    >
                        {label.toUpperCase()}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>


            {objetivo === 'Outro' && (
                <TextField
                    fullWidth
                    placeholder="Descreva seu objetivo"
                    value={outroTexto}
                    onChange={(e) => setOutroTexto(e.target.value)}
                    sx={{
                        mt: 2,
                        backgroundColor: 'white',
                        borderRadius: 1,
                        textAlign: 'left'
                    }}
                />
            )}

            <Stack
                direction={"row"}
                padding={7}
                spacing={4}
            >
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        mt: 4,
                        fontWeight: 'bold',
                        color: 'white',
                        '&:disabled': {
                            backgroundColor: 'rgba(255,255,255,0.5)',
                            color: '#1976d2',
                        },
                        '&:hover': {
                            boxShadow: "none"
                        },
                        maxWidth: 400,
                        minHeight: 50,
                    }}
                    onClick={() => userContext.setCurrentPage("home")}
                >
                    VOLTAR
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        mt: 4,
                        fontWeight: 'bold',
                        color: 'white',
                        '&:disabled': {
                            backgroundColor: 'rgba(255,255,255,0.5)',
                            color: '#1976d2',
                        },
                        maxWidth: 400,
                        minHeight: 50
                    }}
                    onClick={handleNext}
                    disabled={(objetivo === 'Outro' && outroTexto.trim() === '') || objetivo === ""}
                >
                    PRÓXIMO
                </Button>
            </Stack>
        </>
    )
}

export default Step1;