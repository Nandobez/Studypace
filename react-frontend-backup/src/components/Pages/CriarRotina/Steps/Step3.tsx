import {
    Typography,
    Slider,
    Stack,
    Button,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext, IUserContext } from "../../../Contexts/UserContext";
import { CriarRotinaContext, ICriarRotinaContext } from "../../../Contexts/CriarRotinaContext";

const Step3 = () => {
    const userContext = useContext(UserContext) as IUserContext;
    const CriarRotina = useContext(CriarRotinaContext) as ICriarRotinaContext;

    const [horas, setHoras] = useState<number>(3);

    const handleNext = () => {
        CriarRotina.setPrompt(prev => ({ ...prev, step3: `${horas} horas` }));
        CriarRotina.setStep("4");
        console.log('Tempo disponível: ', horas);
        console.log("Prompt: ", CriarRotina.prompt)
    };

    return (
        <>
            <Typography variant="body1" color="white" mb={2} textAlign="left">
                Quantas horas por dia você pode estudar?
            </Typography>

            <Typography
                variant="h5"
                color="white"
                textAlign="center"
                fontWeight="bold"
                mb={2}
            >
                {horas} {horas === 1 ? 'Hora' : 'Horas'}
            </Typography>

            <Slider
                value={horas}
                onChange={(e, newValue) => setHoras(newValue as number)}
                step={1}
                min={1}
                max={12}
                marks
                valueLabelDisplay="off"
                sx={{
                    color: 'white',
                    '& .MuiSlider-thumb': {
                        backgroundColor: 'white',
                    },
                    '& .MuiSlider-track': {
                        backgroundColor: 'white',
                    },
                    '& .MuiSlider-rail': {
                        backgroundColor: 'rgba(255,255,255,0.3)',
                    },
                    '& .MuiSlider-mark': {
                        backgroundColor: 'white',
                    },
                }}
            />

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
                    onClick={() => CriarRotina.setStep("2")}
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
                >
                    PRÓXIMO
                </Button>
            </Stack>
        </>
    );
};

export default Step3;
