import {
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  Button,
  TextField,
  Box,
  CircularProgress
} from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext, IUserContext } from "../../../Contexts/UserContext";
import { CriarRotinaContext, ICriarRotinaContext } from "../../../Contexts/CriarRotinaContext";
import { IRotinaResumoContext, rotinaInitMock, RotinaResumoContext } from "../../../Contexts/RotinaResumoContext";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ChecklistIcon from "@mui/icons-material/Checklist";
import GroupIcon from "@mui/icons-material/Group";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { sendPrompt } from "../../../../api/userApi";

const materiais = [
  { value: "Vídeo-aulas", icon: <OndemandVideoIcon sx={{ mr: 1 }} /> },
  { value: "Podcasts/Audiobooks", icon: <HeadphonesIcon sx={{ mr: 1 }} /> },
  { value: "Leitura de PDFs/Artigos", icon: <PictureAsPdfIcon sx={{ mr: 1 }} /> },
  { value: "Exercícios práticos", icon: <ChecklistIcon sx={{ mr: 1 }} /> },
  { value: "Grupos de estudo", icon: <GroupIcon sx={{ mr: 1 }} /> },
];

const Step6 = () => {
  const userContext = useContext(UserContext) as IUserContext;
  const CriarRotina = useContext(CriarRotinaContext) as ICriarRotinaContext;
  const rotinaContext = useContext(RotinaResumoContext) as IRotinaResumoContext

  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [complementar, setComplementar] = useState("");
  const [loading, setLoading] = useState<boolean>(false);


  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    novosSelecionados: string[]
  ) => {
    setSelecionados(novosSelecionados);
  };

  const handleNext = () => {
    setLoading(true);
    CriarRotina.setPrompt(prev => ({
      ...prev,
      step6: {
        materiais: selecionados,
        complementar: complementar.trim(),
      },
    }));
    console.log("Prompt: ", CriarRotina.prompt)
    const promptPayload = {
      title: CriarRotina.prompt.step2,
      description: "",
      startDate: new Date,
      dateEndDate: CriarRotina.prompt.step4,
      subjects: ["Math"],
      priorityTopics: ["Calculus - Difficult Topics", "Geometry - Difficult Topics", "Algebra - Difficult Topics"],
      dailyHours: CriarRotina.prompt.step3,
      studyType: CriarRotina.prompt.step1,
      purpose: "",
      preferredMethods: CriarRotina.prompt.step6.materiais
    }
    console.log("promptPayload: ", promptPayload)
    sendPrompt(promptPayload, userContext.userInfo.user.id, userContext.userInfo.token)
      .then((resp) => {
        userContext.setCurrentPage("verRotina")
        rotinaContext.setRotina(resp)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        rotinaContext.setRotina(rotinaInitMock)
        setLoading(false)
      });
    // userContext.setCurrentPage("verRotina")
    console.log("Materiais selecionados:", selecionados);
    console.log("Complementares:", complementar);
  };

  return (
    <div style={{ position: "relative", top: 100 }}>
      <Typography variant="body1" color="white" mb={2} textAlign="left">
        Que tipo de material você prefere usar?
      </Typography>

      <ToggleButtonGroup
        value={selecionados}
        onChange={handleChange}
        fullWidth
        orientation="vertical"
        sx={{ gap: 1 }}
      >
        {materiais.map((item, idx) => (
          <ToggleButton
            key={item.value}
            value={item.value}
            sx={{
              backgroundColor: selecionados.includes(item.value) ? '#1976d2' : '#fff',
              color: selecionados.includes(item.value) ? '#fff' : '#1976d2',
              fontWeight: 'bold',
              borderRadius: 1,
              border: "2px solid white",
              justifyContent: 'flex-start',
              '&:hover': {
                backgroundColor: selecionados.includes(item.value)
                  ? '#1565c0'
                  : '#e3f2fd',
              },
              '&.Mui-selected': {
                backgroundColor: '#1976d2',
                color: '#fff',
              }
            }}

          >
            {item.icon}
            {item.value}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Box
        mt={4}
        p={2}
        border="2px dashed #1976d2"
        borderRadius={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        bgcolor="#fff"
      >
        <Typography
          variant="subtitle1"
          color="#1976d2"
          fontWeight="bold"
          textAlign="center"
        >
          Insira os Arquivos a serem usados, ou Digite:
        </Typography>

        <UploadFileIcon sx={{ fontSize: 40, color: "#1976d2" }} />

        <TextField
          fullWidth
          placeholder="Digite aqui..."
          multiline
          minRows={2}
          value={complementar}
          onChange={(e) => setComplementar(e.target.value)}
          sx={{
            backgroundColor: "#f5f5f5",
            borderRadius: 1,
          }}
        />
      </Box>


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
          onClick={() => CriarRotina.setStep("5")}
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
          disabled={(selecionados.length === 0 && complementar.trim() === "") || loading}
        >
          {loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : "PRÓXIMO"}
        </Button>
      </Stack>
    </div>
  );
};

export default Step6;
