import {
    Typography,
    ToggleButtonGroup,
    ToggleButton,
    TextField,
    Stack,
    Button,
    Chip,
    IconButton
} from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext, IUserContext } from "../../../Contexts/UserContext";
import { CriarRotinaContext, ICriarRotinaContext } from "../../../Contexts/CriarRotinaContext";
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import TerminalIcon from '@mui/icons-material/Terminal';
import LanguageIcon from '@mui/icons-material/Language';
import AddIcon from '@mui/icons-material/Add';

const Step2 = () => {
    const userContext = useContext(UserContext) as IUserContext;
    const CriarRotina = useContext(CriarRotinaContext) as ICriarRotinaContext;

    const [area, setArea] = useState<string>("");
    const [outroTexto, setOutroTexto] = useState('');

    const [materiaInput, setMateriaInput] = useState('');
    const [topicoInput, setTopicoInput] = useState('');
    const [materias, setMaterias] = useState<string[]>([]);
    const [topicos, setTopicos] = useState<string[]>([]);

    const handleChange = (_: React.MouseEvent<HTMLElement>, newArea: string) => {
        setArea(newArea);
        if (newArea !== 'Outro') setOutroTexto('');
        setMaterias([]);
        setTopicos([]);
    };

    const adicionarItem = (valor: string, set: Function, array: string[], clear: Function) => {
        if (valor.trim() !== '' && !array.includes(valor.trim())) {
            set([...array, valor.trim()]);
            clear('');
        }
    };

    const removerItem = (item: string, set: Function, array: string[]) => {
        set(array.filter(i => i !== item));
    };

    const handleNext = () => {
        const resultado = area === 'Outro' ? outroTexto : area;
        const dados = {
            area: resultado,
            materias: area !== 'Outro' ? materias : [],
            topicos: area !== 'Outro' ? topicos : [],
        };
        CriarRotina.setPrompt(prev => ({ ...prev, step2: dados }));
        CriarRotina.setStep("3");
        console.log('Área escolhida:', dados);
    };

    const isNextDisabled = () => {
        if (area === '') return true;
        if (area === 'Outro') return outroTexto.trim() === '';
        return materias.length === 0 || topicos.length === 0;
    };

    return (
        <>
            <Typography variant="body1" color="white" mb={2} textAlign="left" sx={{ textShadow: '4px 4px 0px rgb(0, 0, 0)' }}>
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
                <ToggleButton value="Ciências Exatas" sx={toggleButtonStyle(area === "Ciências Exatas")}>
                    <SchoolIcon sx={{ mr: 1 }} /> CIÊNCIAS EXATAS
                </ToggleButton>
                <ToggleButton value="Ciências Humanas" sx={toggleButtonStyle(area === "Ciências Humanas")}>
                    <GroupsIcon sx={{ mr: 1 }} /> CIÊNCIAS HUMANAS
                </ToggleButton>
                <ToggleButton value="Tecnologia e Programação" sx={toggleButtonStyle(area === "Tecnologia e Programação")}>
                    <TerminalIcon sx={{ mr: 1 }} /> TECNOLOGIA E PROGRAMAÇÃO
                </ToggleButton>
                <ToggleButton value="Idiomas" sx={toggleButtonStyle(area === "Idiomas")}>
                    <LanguageIcon sx={{ mr: 1 }} /> IDIOMAS
                </ToggleButton>
                <ToggleButton value="Outro" sx={toggleButtonStyle(area === "Outro")}>
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
                        textAlign: 'left'
                    }}
                />
            )}

            {area && area !== 'Outro' && (
                <Stack mt={3} spacing={3}>
                    {/* Matéria */}
                    <Stack direction="row" spacing={1}>
                        <TextField
                            label="Adicionar Matéria"
                            variant="filled"
                            value={materiaInput}
                            onChange={(e) => setMateriaInput(e.target.value)}
                            sx={{ backgroundColor: 'white', borderRadius: 1, flex: 1 }}
                        />
                        <IconButton
                            color="primary"
                            onClick={() => adicionarItem(materiaInput, setMaterias, materias, setMateriaInput)}
                        >
                            <AddIcon color="secondary" />
                        </IconButton>
                    </Stack>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {materias.map((mat, index) => (
                            <Chip
                                key={index}
                                label={mat}
                                onDelete={() => removerItem(mat, setMaterias, materias)}
                                sx={{ mb: 1 }}
                                color="secondary"
                            />
                        ))}
                    </Stack>

                    {/* Tópico */}
                    <Stack direction="row" spacing={1}>
                        <TextField
                            label="Adicionar Tópico"
                            variant="filled"
                            value={topicoInput}
                            onChange={(e) => setTopicoInput(e.target.value)}
                            sx={{ backgroundColor: 'white', borderRadius: 1, flex: 1 }}
                        />
                        <IconButton
                            color="primary"
                            onClick={() => adicionarItem(topicoInput, setTopicos, topicos, setTopicoInput)}
                        >
                            <AddIcon color="secondary" />
                        </IconButton>
                    </Stack>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {topicos.map((top, index) => (
                            <Chip
                                key={index}
                                label={top}
                                onDelete={() => removerItem(top, setTopicos, topicos)}
                                sx={{ mb: 1 }}
                                color="secondary"
                            />
                        ))}
                    </Stack>
                </Stack>
            )}

            <Stack direction="row" padding={7} spacing={4}>
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
                    onClick={() => CriarRotina.setStep("1")}
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
                    disabled={isNextDisabled()}
                >
                    PRÓXIMO
                </Button>
            </Stack>
        </>
    );
};

export default Step2;

// Estilo unificado ao Step1
const toggleButtonStyle = (selected: boolean) => ({
    backgroundColor: selected ? 'rgb(255, 255, 255)' : '#004c6d',
    color: selected ? 'rgb(255, 255, 255)' : '#ffffff',
    fontWeight: 'bold',
    boxShadow: '4px 4px 0px #ffcc34',
    border: 'none',
    '&:hover': {
        backgroundColor: selected ? '#fff' : '#08344c',
        color: selected ? 'rgb(255, 255, 255)' : 'rgb(255, 255, 255)',
        boxShadow: "none"
    },
    '&.Mui-selected': {
        color: 'rgb(255, 255, 255)',
        backgroundColor: "#08344c",
        boxShadow: "none"
    }
});
