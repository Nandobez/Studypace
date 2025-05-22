import React, { useContext, useState } from 'react';
import { Box, Paper } from '@mui/material';
import img from '../../../assets/img.png';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import { LoginContext, ILoginContext } from '../../Contexts/LoginContext';
import logo1 from '../../../assets/logo1.png';

const Login = () => {
    const loginContext = useContext(LoginContext) as ILoginContext

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100vh',
                width: '100vw',
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'right center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                paddingLeft: 15
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
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    zIndex: 2,
                }}
            >
                {loginContext.login.form === "login" ?
                    <LoginForm /> :
                    <RegisterForm />
                }
            </Box>
        </Box>
    );
};

export default Login;
