import React, { useContext, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    LinearProgress,
    TextField,
    ButtonGroup,
    Stack,
} from '@mui/material';
import { CriarRotinaContext, ICriarRotinaContext } from "../../Contexts/CriarRotinaContext";
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';
import Step5 from './Steps/Step5';
import Step6 from './Steps/Step6';

const CriarRotina = () => {
    const CriarRotina = useContext(CriarRotinaContext) as ICriarRotinaContext;
    const linearProgressValue =
        CriarRotina.step === "1" ? 14 :
            CriarRotina.step === "2" ? 28 :
                CriarRotina.step === "3" ? 42 :
                    CriarRotina.step === "4" ? 56 :
                        CriarRotina.step === "5" ? 70 :
                            CriarRotina.step === "6" ? 84 :
                                100
    const titleValue =
        CriarRotina.step === "1" ? "Objetivo" :
            CriarRotina.step === "2" ? "Área de Estudo" :
                CriarRotina.step === "3" ? "Tempo Disponível" :
                    CriarRotina.step === "4" ? "Duração do Plano" :
                        CriarRotina.step === "5" ? "Frequência Semanal" :
                            CriarRotina.step === "6" ? "Modo de Estudo" :
                                "Plano Criado!"
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100vh',
                width: '100vw',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
            }}
        >

            <Box
                sx={{
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: '#1976d2',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    px: 2,
                }}
            >
                <Box sx={{ width: '50%', position: "relative", bottom: 150 }}>
                    <Typography
                        variant="h5" fontWeight="bold" align="center" color="white" mb={2} padding={10}
                        sx={{ position: "relative", top:  CriarRotina.step === "6" ? 150 : 0 }}
                    >
                        {titleValue}
                    </Typography>

                    <LinearProgress
                        variant="determinate"
                        value={linearProgressValue}
                        sx={{
                            mb: 4,
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: '#fff',
                            },
                            position: "relative", top: CriarRotina.step === "6" ? 100 : 0
                        }}
                    />
                    {
                        CriarRotina.step === "1" ?
                            <Step1 />
                            :
                            CriarRotina.step === "2" ?
                                <Step2 /> :
                                CriarRotina.step === "3" ?
                                    <Step3 /> :
                                    CriarRotina.step === "4" ?
                                        <Step4 /> :
                                        CriarRotina.step === "5" ?
                                            <Step5 /> :
                                            CriarRotina.step === "6" ?
                                                <Step6 /> :
                                                <></>
                    }
                </Box>
            </Box>
        </Box>

    );
};

export default CriarRotina;
