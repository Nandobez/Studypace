import {
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  Button
} from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext, IUserContext } from "../../../Contexts/UserContext";
import { CriarRotinaContext, ICriarRotinaContext } from "../../../Contexts/CriarRotinaContext";

const diasSemana = [
  { label: "Domingo", value: "Domingo" },
  { label: "Segunda", value: "Segunda" },
  { label: "Terça", value: "Terça" },
  { label: "Quarta", value: "Quarta" },
  { label: "Quinta", value: "Quinta" },
  { label: "Sexta", value: "Sexta" },
  { label: "Sábado", value: "Sábado" },
];

const Step5 = () => {
  const userContext = useContext(UserContext) as IUserContext;
  const CriarRotina = useContext(CriarRotinaContext) as ICriarRotinaContext;

  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newDias: string[]
  ) => {
    setDiasSelecionados(newDias);
  };

  const handleNext = () => {
    CriarRotina.setPrompt(prev => ({ ...prev, step5: diasSelecionados }));
    CriarRotina.setStep("6");
    console.log("Dias selecionados:", diasSelecionados);
  };

  return (
    <>
      <Typography variant="body1" color="white" mb={2} textAlign="left">
        Quais dias da semana você quer estudar?
      </Typography>

      <ToggleButtonGroup
        value={diasSelecionados}
        onChange={handleChange}
        fullWidth
        sx={{
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: 2,
          px: 2,
          py: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {diasSemana.map((dia, idx) => (
          <ToggleButton
            key={`${dia.value}-${idx}`}
            value={dia.value}
            sx={{
              backgroundColor: diasSelecionados.includes(dia.value)
                ? "rgba(255,255,255,0.1)"
                : "rgb(255, 255, 255)",
              color: diasSelecionados.includes(dia.value)
                ? "rgb(255, 255, 255)"
                : "#1976d2",
              fontWeight: "bold",
              border: "2px solid white",
              width: 100,
              height: 48,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: diasSelecionados.includes(dia.value)
                  ? "#f5f5f5"
                  : "rgba(255,255,255,0.2)",
              },
              '&.Mui-selected': {
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "rgb(255, 255, 255)",
              }
            }}
          >
            {dia.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

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
          onClick={() => CriarRotina.setStep("4")}
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
          disabled={diasSelecionados.length === 0}
        >
          PRÓXIMO
        </Button>
      </Stack>
    </>
  );
};

export default Step5;
