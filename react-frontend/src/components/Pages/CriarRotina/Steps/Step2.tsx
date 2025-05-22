import { Typography, ToggleButtonGroup, ToggleButton, TextField, Stack, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext, IUserContext } from "../../../Contexts/UserContext";
import { CriarRotinaContext, ICriarRotinaContext } from "../../../Contexts/CriarRotinaContext";
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import TerminalIcon from '@mui/icons-material/Terminal';
import LanguageIcon from '@mui/icons-material/Language';

const Step2 = () => {
    const userContext = useContext(UserContext) as IUserContext;
    const CriarRotina = useContext(CriarRotinaContext) as ICriarRotinaContext;

    const [area, setArea] = useState<string>("");
    const [outroTexto, setOutroTexto] = useState('');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newArea: string
    ) => {
        setArea(newArea);
        if (newArea !== 'Outro') setOutroTexto('');
    };

    const handleNext = () => {
        const resultado = area === 'Outro' ? outroTexto : area;
        CriarRotina.setPrompt(prev => ({ ...prev, step2: resultado }));
        CriarRotina.setStep("3");
        console.log('Área escolhida:', resultado);
    };

    return (
        <>
            <Typography variant="body1" color="white" mb={2} textAlign={"left"}>
                Qual é a área principal do seu estudo?
            </Typography>

            <ToggleButtonGroup
                orientation="vertical"
                value={area}
                exclusive
                onChange={handleChange}
                fullWidth
                sx={{ gap: 1 }}
            >
                <ToggleButton
                    value="Ciências Exatas"
                    sx={toggleButtonSx(area === "Ciências Exatas")}
                >
                    <SchoolIcon sx={{ mr: 1 }} />
                    CIÊNCIAS EXATAS
                </ToggleButton>
                <ToggleButton
                    value="Ciências Humanas"
                    sx={toggleButtonSx(area === "Ciências Humanas")}
                >
                    <GroupsIcon sx={{ mr: 1 }} />
                    CIÊNCIAS HUMANAS
                </ToggleButton>
                <ToggleButton
                    value="Tecnologia e Programação"
                    sx={toggleButtonSx(area === "Tecnologia e Programação")}
                >
                    <TerminalIcon sx={{ mr: 1 }} />
                    TECNOLOGIA E PROGRAMAÇÃO
                </ToggleButton>
                <ToggleButton
                    value="Idiomas"
                    sx={toggleButtonSx(area === "Idiomas")}
                >
                    <LanguageIcon sx={{ mr: 1 }} />
                    IDIOMAS
                </ToggleButton>
                <ToggleButton
                    value="Outro"
                    sx={toggleButtonSx(area === "Outro")}
                >
                    OUTRO
                </ToggleButton>
            </ToggleButtonGroup>

            {area === 'Outro' && (
                <TextField
                    fullWidth
                    placeholder="Descreva sua área"
                    value={outroTexto}
                    onChange={(e) => setOutroTexto(e.target.value)}
                    sx={{
                        mt: 2,
                        backgroundColor: 'white',
                        borderRadius: 1,
                    }}
                />
            )}

            <Stack direction="row" padding={7} spacing={4}>
                <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    sx={{
                        mt: 4,
                        fontWeight: 'bold',
                        color: 'white',
                        maxWidth: 400,
                        minHeight: 50,
                    }}
                    onClick={() => CriarRotina.setStep("1")}
                >
                    VOLTAR
                </Button>
                <Button
                    variant="contained"
                    color="success"
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
                    disabled={(area === 'Outro' && outroTexto.trim() === '') || area === ""}
                >
                    PRÓXIMO
                </Button>
            </Stack>
        </>
    );
};

export default Step2;

// estilo extraído e reutilizado para clareza
const toggleButtonSx = (selected: boolean) => ({
    backgroundColor: selected ? 'rgb(255, 255, 255)' : 'rgb(255, 255, 255)',
    color: selected ? 'rgb(255, 255, 255)' : '#1976d2',
    fontWeight: 'bold',
    border: 'none',
    '&:hover': {
        backgroundColor: selected ? '#fff' : 'rgba(255, 255, 255, 0.3)',
        color: selected ? 'rgb(255, 255, 255)' : 'rgb(255, 255, 255)',
    },
    '&.Mui-selected': {
        color: 'rgb(255, 255, 255)'
    }
});
