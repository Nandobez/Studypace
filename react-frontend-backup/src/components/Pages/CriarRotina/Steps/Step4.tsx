import {
    Typography,
    Stack,
    Button,
    TextField
} from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext, IUserContext } from "../../../Contexts/UserContext";
import { CriarRotinaContext, ICriarRotinaContext } from "../../../Contexts/CriarRotinaContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ptBR } from "date-fns/locale";

const Step4 = () => {
    const userContext = useContext(UserContext) as IUserContext;
    const CriarRotina = useContext(CriarRotinaContext) as ICriarRotinaContext;

    const [data, setData] = useState<Date | null>(null);

    const handleNext = () => {
        CriarRotina.setPrompt(prev => ({
            ...prev,
            step4: data?.toLocaleDateString("pt-BR")
        }));
        CriarRotina.setStep("5");
        console.log("Data escolhida:", data);
    };

    return (
        <>
            <Typography variant="body1" color="white" mb={2} textAlign="left">
                Até quando você pretende seguir essa rotina?
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                <DatePicker
                    label="Selecione a Data"
                    value={data}
                    onChange={(newValue) => setData(newValue)}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            variant: "filled",
                            sx: {
                                backgroundColor: "white",
                                borderRadius: 1
                            },
                        },
                    }}
                />
            </LocalizationProvider>

            <Stack direction="row" padding={7} spacing={4}>
                <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    sx={{
                        mt: 4,
                        fontWeight: "bold",
                        color: "white",
                        maxWidth: 400,
                        minHeight: 50,
                    }}
                    onClick={() => CriarRotina.setStep("3")}
                >
                    VOLTAR
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    sx={{
                        mt: 4,
                        fontWeight: "bold",
                        color: "white",
                        maxWidth: 400,
                        minHeight: 50,
                    }}
                    onClick={handleNext}
                    disabled={!data}
                >
                    PRÓXIMO
                </Button>
            </Stack>
        </>
    );
};

export default Step4;
