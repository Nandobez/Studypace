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
import { useContext, useState } from "react";
import { IRotinaResumoContext, RotinaResumoContext } from "../../Contexts/RotinaResumoContext";
import React from "react";
import NavBar from "../../NavBar/NavBar";
import { CriarRotinaContext, ICriarRotinaContext } from "@/components/Contexts/CriarRotinaContext";

const RotinaResumo = () => {

  const rotinaContext = useContext(RotinaResumoContext) as IRotinaResumoContext

  const jsonMatch = rotinaContext.rotina.geminiGeneratedContent.match(/```json\s*([\s\S]*?)\s*```/);
  const rotinaJSON = jsonMatch ? JSON.parse(jsonMatch[1]) : {
    schedule: [
      {
        date: "2025-06-10",
        subjects: [
          {
            name: "Matemática",
            priority: "HIGH",
            timeSlots: "14:00-15:00",
            topics: [""]
          }
        ]
      }
    ],
    recommendations: "Nd",
    importantSubjects: ["Nd"]
  };

  console.log("ROTINA: ", rotinaJSON)

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        overflowY: 'scroll',
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
          overflowY: 'scroll',
          justifyContent: 'center',
          // alignItems: 'center',
          px: 2,
        }}
      >
        <Container maxWidth="md" sx={{ py: 5  }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom sx={{ color: '#1976d2' }}>
            📘 {rotinaContext.rotina.title}
          </Typography>

          {/* <Box sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {rotinaContext.rotina.progress}% Completo
            </Typography>
            <LinearProgress variant="determinate" value={rotinaContext.rotina.progress} sx={{ height: 10, borderRadius: 5 }} />
          </Box> */}

          {/* Resumo */}
          <Card sx={{ my: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🎯 Resumo da Rotina
              </Typography>
              <Stack spacing={1}>
                <Chip icon={<School />} label={`Objetivo: ${rotinaContext.rotina.objetivo}`} />
                <Chip icon={<AccessTime />} label={`Até quando: ${rotinaContext.rotina.endDate}`} />
                <Chip icon={<Checklist />} label={`Tempo diário: ${rotinaContext.rotina.dailyStudyHours} por dia`} />
              </Stack>
            </CardContent>
          </Card>

          {/* Agenda do Dia */}
          <Card sx={{ my: 3}}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📅 Agenda do Dia
              </Typography>
              <Stack spacing={2}>
                {rotinaJSON.schedule.map((entry: any) => (
                  <Box key={entry.date}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {new Date(entry.date).toLocaleDateString('pt-BR')}
                    </Typography>
                    <Stack spacing={1} mt={1}>
                      {entry.subjects.map((subject: any, index: any) => (
                        <Box
                          key={`${subject.name}-${index}`}
                          sx={{
                            border: '1px solid #ccc',
                            borderRadius: 2,
                            p: 1.5,
                            backgroundColor: '#f9f9f9',
                          }}
                        >
                          <Typography variant="body1" fontWeight="bold">
                            🧠 {subject.name} ({subject.priority})
                          </Typography>
                          <Typography variant="body2">⏰ {subject.timeSlots}</Typography>
                          <ul style={{ margin: 0, paddingLeft: 20 }}>
                            {subject.topics.map((topic: any, i: any) => (
                              <li key={i}>
                                <Typography variant="body2">{topic}</Typography>
                              </li>
                            ))}
                          </ul>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>


          {/* <Card sx={{ my: 3 }}>
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
                <img src="/path/to/grafico.png" alt="Gráfico" width="100%" />
              </Box>
            </CardContent>
          </Card> */}

          <Alert severity="info" icon={<Feedback />} sx={{ mt: 4 }}>
            <strong>Feedback da IA:</strong><br />
            {rotinaJSON.recommendations}
          </Alert>
        </Container>
      </Box>
    </Box >
  );
};

export default RotinaResumo;
