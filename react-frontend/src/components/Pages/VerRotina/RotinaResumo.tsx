import {
  Box,
  Container,
  Typography,
  LinearProgress,
  Card,
  CardContent,
  Divider,
  Stack,
  Chip,
  Alert,
  Avatar,
  Tooltip,
  AppBar,
  IconButton,
  Toolbar,
} from "@mui/material";
import { School, AccessTime, Checklist, Insights, Feedback, Logout } from "@mui/icons-material";
import { useContext } from "react";
import { IRotinaResumoContext, RotinaResumoContext } from "../../Contexts/RotinaResumoContext";
import React from "react";
import NavBar from "../../NavBar/NavBar";
import { CriarRotinaContext, ICriarRotinaContext } from "@/components/Contexts/CriarRotinaContext";

const RotinaResumo = () => {

  const rotinaContext = useContext(RotinaResumoContext) as IRotinaResumoContext

  console.log("geminiGeneratedContent: ", JSON.parse(rotinaContext.rotina.geminiGeneratedContent).schedule);
  
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
      <NavBar />
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          backgroundColor: 'rgb(255, 255, 255)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
        }}
      >
        <Container maxWidth="md" sx={{ py: 5 }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom sx={{ color: '#1976d2' }}>
            📘 {rotinaContext.rotina.title}
          </Typography>

          <Box sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {rotinaContext.rotina.progress}% Completo
            </Typography>
            <LinearProgress variant="determinate" value={rotinaContext.rotina.progress} sx={{ height: 10, borderRadius: 5 }} />
          </Box>

          {/* Resumo */}
          <Card sx={{ my: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🎯 Resumo da Rotina
              </Typography>
              <Stack spacing={1}>
                <Chip icon={<School />} label={`Objetivo: ${rotinaContext.rotina.objetivo}`} />
                <Chip icon={<AccessTime />} label={`Até quando: ${rotinaContext.rotina.endDate}`} />
                <Chip icon={<Checklist />} label={`Tempo diário: ${rotinaContext.rotina.tempoPorDia} por dia`} />
              </Stack>
            </CardContent>
          </Card>

          {/* Agenda do Dia */}
          <Card sx={{ my: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📅 Agenda do Dia
              </Typography>
              <Stack spacing={1}>
                {/* {rotinaContext.rotina.agenda.map((item, idx) => (
                  <Typography key={idx} variant="body1">
                    • {item}
                  </Typography>
                ))} */}
              </Stack>
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <Card sx={{ my: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📊 Estatísticas
              </Typography>
              <Typography color="success.main" fontWeight="bold">
                ✅ {rotinaContext.rotina.diasSeguidos} dias consecutivos seguindo a rotina!
              </Typography>
              <Typography>
                Média de horas por dia: {rotinaContext.rotina.mediaHoras}h
              </Typography>
              <Box sx={{ mt: 2 }}>
                {/* Você pode usar um gráfico real aqui com Recharts, Chart.js etc. */}
                <img src="/path/to/placeholder-grafico.png" alt="Gráfico" width="100%" />
              </Box>
            </CardContent>
          </Card>

          {/* Feedback da IA */}
          <Alert severity="info" icon={<Feedback />} sx={{ mt: 4 }}>
            <strong>Feedback da IA:</strong><br />
            {rotinaContext.rotina.feedBack}
          </Alert>
        </Container>
      </Box>
    </Box>
  );
};

export default RotinaResumo;
