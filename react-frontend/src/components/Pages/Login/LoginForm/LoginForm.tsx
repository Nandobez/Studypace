import React, { useContext, useState } from "react"
import { Google, Facebook } from "@mui/icons-material"
import { Typography, TextField, Box, Link, Button, Divider, IconButton, CircularProgress } from "@mui/material"
import { LoginContext, ILoginContext } from "../../../Contexts/LoginContext"
import { ILoginForm } from "./LoginFormTypes"
import { loginFormInit } from "./LoginFormConsts"
import { loginUser } from "../../../../api/userApi"
import { IUserContext, UserContext } from "../../../Contexts/UserContext";
import PixelIcon from "../../../Icons/PixelIcon"
import Login from 'pixelarticons/svg/login.svg?react';

const LoginForm = () => {
    const userContext = useContext(UserContext) as IUserContext;
    const loginContext = useContext(LoginContext) as ILoginContext
    const [loginForm, setLoginForm] = useState<ILoginForm>(loginFormInit)
    const [loading, setLoading] = useState<boolean>(false);

    const handleLoginFormChange = (field: "email" | "password", value: string) => {
        switch (field) {
            case "email":
                setLoginForm(prev => ({ ...prev, email: value }))
                break;
            case "password":
                setLoginForm(prev => ({ ...prev, password: value }))
                break;
        }
    }

    const submitLogin = () => {
        setLoading(true)
        loginUser(loginForm)
            .then((resp) => {
                console.log("resp: ", resp)
                setLoading(false)
                userContext.setUserInfo(resp)
            })
            .catch(() => {
                console.log("erro")
                setLoading(false)
            })
    }

    return (
        <>
            <Typography variant="h4" fontWeight={700} fontFamily={"Pixellari"} mb={3} textAlign="start" color="primary" >
                Bem-vindo ao StudyPace!
            </Typography>

            <TextField
                fullWidth
                label="Email"
                margin="normal"
                variant="filled"
                value={loginForm.email}
                sx={{borderRadius: 0}}
                onChange={(e) => handleLoginFormChange("email", e.target.value)}
            />

            <TextField
                fullWidth
                label="Senha"
                type="password"
                margin="normal"
                variant="filled"
                value={loginForm.password}
                onChange={(e) => handleLoginFormChange("password", e.target.value)}
            />

            <Box textAlign="start" mt={1} mb={2}>
                {/* <Link href="#" variant="body2" underline="hover" fontWeight={700}>
                    Esqueceu a senha
                </Link> */}
            </Box>

            <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{gap: 1}}
                onClick={submitLogin}
                disabled={loading}
            >
                {loading ? <CircularProgress size={20} /> : <>LOGIN {<PixelIcon Icon={Login} style={{position: "relative", bottom: 2}} size={22}/>}</>}
            </Button>

            <Typography variant="body2" align="center" mb={1} p={1}>
                Não tem cadastro?{' '}
                <Link
                    href="#"
                    underline="hover"
                    fontWeight={700}
                    onClick={() => loginContext.setLogin({ form: "register" })}
                >
                    Se cadastre agora
                </Link>
            </Typography>

            <Divider sx={{ my: 2 }}>Ou continue com</Divider>

            <Box display="flex" justifyContent="center" gap={2}>
                <IconButton color="error">
                    <Google />
                </IconButton>
                <IconButton color="primary">
                    <Facebook />
                </IconButton>
            </Box>
        </>
    )
}

export default LoginForm;