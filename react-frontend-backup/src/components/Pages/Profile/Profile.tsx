import React, { useContext, useState } from 'react';
import { Autocomplete, Box, Button, CircularProgress, Divider, List, ListItemButton, ListItemText, Paper, Stack, TextField, Typography } from '@mui/material';
import img from '../../../assets/img.png';
import NavBar from '../../NavBar/NavBar';
import { IUserContext, UserContext } from '../../Contexts/UserContext';
import { createUser, deleteUser, updateUser } from '../../../api/userApi';

const Profile = () => {

    const userContext = useContext(UserContext) as IUserContext;
    const [operation, setOperation] = useState<null | "edit" | "delete">(null)
    const [loading, setLoading] = useState<boolean>(false);

    const onVoltar = () => {
        setOperation(null)
    }

    const onEditarPerfil = () => {
        setOperation("edit")
    }

    const onExcluirPerfil = () => {
        setOperation("delete")
    }

    const handleRegisterFormChange = (field: "name" | "email" | "password" | "role", value: any) => {
        switch (field) {
            case "name":
                userContext.setUserInfo(prev => ({ ...prev, name: value }))
                break;
            case "email":
                userContext.setUserInfo(prev => ({ ...prev, email: value }))
                break;
            case "password":
                userContext.setUserInfo(prev => ({ ...prev, password: value }))
                break;
            case "role":
                userContext.setUserInfo(prev => ({ ...prev, role: value }))
                break;
        }
    }

    const submitOperation = () => {
        setLoading(true)
        operation === "edit" ?
            updateUser(1, userContext.userInfo)
                .then((resp) => {
                    setLoading(false)
                    userContext.setUserInfo(resp)
                })
                .catch(() => {
                    setLoading(false)
                })
            :
            deleteUser(1)
                .then((resp) => {
                    setLoading(false)
                })
                .catch(() => {
                    setLoading(false)
                })
    }

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
                    flex: 1,
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    px: 2,
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                {/* Overlay escuro para legibilidade */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        zIndex: 1,
                    }}
                />
                {/* <Box component="img" src={logo1} alt="StudyPace Logo" sx={{ height: 50, zIndex: 2, }} /> */}
                <Box
                    component={Paper}
                    elevation={10}
                    sx={{
                        width: '100%',
                        maxWidth: 500,
                        p: 4,
                        borderRadius: 5,
                        backgroundColor: 'rgba(255, 255, 255)',
                        zIndex: 2,
                        position: "relative",
                        right: 550
                    }}
                >
                    <Typography variant="h4" fontWeight={700} fontFamily={"Pixellari"}  mb={3} textAlign="start">
                        {operation === null ? "Perfil" : operation === "edit" ? "Editar Perfil" : "Excluir Perfil"}
                    </Typography>
                    {
                        operation === null ?
                            <Box maxWidth="sm" mx="auto" mt={5} bgcolor="rgba(255, 255, 255, 0.95)" borderRadius={2} boxShadow={0}>
                                <List disablePadding>
                                    <ListItemButton
                                        onClick={onEditarPerfil}
                                    >
                                        <ListItemText primary={
                                            <Typography fontWeight="bold">
                                                Editar
                                            </Typography>
                                        } />
                                    </ListItemButton>
                                    <Divider />
                                    <ListItemButton
                                        onClick={onExcluirPerfil}
                                    >
                                        <ListItemText primary={
                                            <Typography color="error" fontWeight="bold">
                                                Excluir
                                            </Typography>
                                        } />
                                    </ListItemButton>
                                </List>
                            </Box>
                            :
                            <>
                                {
                                    operation === "edit" ?
                                        <TextField
                                            fullWidth
                                            label="Nome"
                                            margin="normal"
                                            variant="outlined"
                                            value={userContext.userInfo.name}
                                            onChange={(e) => handleRegisterFormChange("name", e.target.value)}
                                        />
                                        :
                                        <></>
                                }

                                <TextField
                                    fullWidth
                                    label="Email"
                                    margin="normal"
                                    variant="outlined"
                                    value={userContext.userInfo.email}
                                    onChange={(e) => handleRegisterFormChange("email", e.target.value)}
                                />

                                <TextField
                                    fullWidth
                                    label="Senha"
                                    type="password"
                                    margin="normal"
                                    variant="outlined"
                                    value={userContext.userInfo.password}
                                    onChange={(e) => handleRegisterFormChange("password", e.target.value)}
                                />

                                {
                                    operation === "edit" ?

                                        <Autocomplete
                                            options={["Estudante", "Professor"]}
                                            value={userContext.userInfo.role}
                                            onChange={(event, newValue) => {
                                                handleRegisterFormChange("role", newValue)
                                            }}
                                            noOptionsText="Sem resultado"
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    label="Função"
                                                    margin="normal"
                                                    variant="outlined"
                                                />
                                            )}
                                        />
                                        :
                                        <></>
                                }

                                <Box mt={1} mb={2}>
                                </Box>

                                <Stack
                                    direction={"row"}
                                    padding={7}
                                    spacing={4}
                                >
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        fullWidth
                                        onClick={onVoltar}
                                    >
                                        VOLTAR
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color={operation === "edit" ? "primary" : "error"}
                                        size="large"
                                        sx={{ mb: 2 }}
                                        onClick={submitOperation}
                                        disabled={loading}
                                    >
                                        {loading ? <CircularProgress size={20} /> : "Confirmar"}
                                    </Button>
                                </Stack>
                            </>
                    }
                </Box>
            </Box>
        </Box>
    );
};

export default Profile;
