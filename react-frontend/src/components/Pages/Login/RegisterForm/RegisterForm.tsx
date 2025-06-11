import { LoginContext, ILoginContext } from "../../../Contexts/LoginContext"
import { Google, Facebook } from "@mui/icons-material";
import { Typography, TextField, Box, Link, Button, CircularProgress, Divider, IconButton, Autocomplete } from "@mui/material";
import React, { useContext, useState } from "react";
import { registerFormInit } from "./RegisterFormConsts";
import { IRegisterForm } from "./RegisterFormTypes";
import { register } from "../../../../api/userApi";
import { IUserContext, UserContext } from "../../../Contexts/UserContext";

const RegisterForm = () => {
    const userContext = useContext(UserContext) as IUserContext;
    const loginContext = useContext(LoginContext) as ILoginContext
    const [registerForm, setRegisterForm] = useState<IRegisterForm>(registerFormInit)
    const [loading, setLoading] = useState<boolean>(false);

    const handleRegisterFormChange = (field: "name" | "email" | "password" | "role", value: any) => {
        switch (field) {
            case "name":
                setRegisterForm(prev => ({ ...prev, name: value }))
                break;
            case "email":
                setRegisterForm(prev => ({ ...prev, email: value }))
                break;
            case "password":
                setRegisterForm(prev => ({ ...prev, password: value }))
                break;
            case "role":
                setRegisterForm(prev => ({ ...prev, role: value }))
                break;
        }
    }

    const submitRegister = () => {
        setLoading(true)

        console.log(registerForm)
        register(registerForm)  
            .then((resp) => {
                console.log(resp)
                setLoading(false)
                userContext.setUserInfo(resp)
                console.log("acerto")
            })
            .catch(() => {
                console.log("erro")
                setLoading(false)
            })
    }

    return (
        <>
            <Typography variant="h4" fontWeight={700} fontFamily={"Pixellari"} mb={3} textAlign="start">
                Realizar Cadastro
            </Typography>

            <TextField
                fullWidth
                label="Nome"
                margin="normal"
                variant="outlined"
                value={registerForm.name}
                onChange={(e) => handleRegisterFormChange("name", e.target.value)}
            />

            <TextField
                fullWidth
                label="Email"
                margin="normal"
                variant="outlined"
                value={registerForm.email}
                onChange={(e) => handleRegisterFormChange("email", e.target.value)}
            />

            <TextField
                fullWidth
                label="Senha"
                type="password"
                margin="normal"
                variant="outlined"
                value={registerForm.password}
                onChange={(e) => handleRegisterFormChange("password", e.target.value)}
            />

            <Autocomplete
                value={registerForm.role}
                options={["Estudante", "Professor"]}
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


            <Box mt={1} mb={2}>
            </Box>

            <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ mb: 2 }}
                onClick={submitRegister}
                disabled={loading}
            >
                {loading ? <CircularProgress size={20} /> : "Cadastrar"}
            </Button>
        </>
    )
}

export default RegisterForm;