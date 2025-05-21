import React from 'react';
import {
    Box,
    Button,
    Container,
    Divider,
    IconButton,
    Link,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { Google, Facebook } from '@mui/icons-material';
import img from '../../../assets/img.png';


const LoginPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            {/* Formulário de Login */}
            <Box
                component={Paper}
                elevation={10}
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    margin: 'auto',
                    p: 4,
                    borderRadius: 10,
                }}
            >
                <Typography variant="h4" fontWeight={700} mb={3} textAlign={"start"}>
                    Bem Vindo!
                </Typography>

                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    fullWidth
                    label="Senha"
                    type="password"
                    margin="normal"
                    variant="outlined"
                />

                <Box textAlign="start" mt={1} mb={2}>
                    <Link href="#" variant="body2" underline="hover" fontWeight={700}>
                        Esqueceu a senha
                    </Link>
                </Box>

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mb: 2 }}
                >
                    Login
                </Button>

                <Typography variant="body2" align="center" mb={1}>
                    Não tem cadastro?{' '}
                    <Link href="#" underline="hover" fontWeight={700}>
                        Se registre agora
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
            </Box>

            {/* Ilustração */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'block' },
                    flex: 1,
                }}
            >
                <img
                    src={img}
                    alt="Tela ilustrativa"
                    style={{
                        width: '200%',
                        height: '100vh',
                        objectFit: 'cover',
                        display: 'block',
                    }}
                />
            </Box>

        </Box>
    );
};

export default LoginPage;
