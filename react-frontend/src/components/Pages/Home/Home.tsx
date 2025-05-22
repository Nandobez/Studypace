import { UserContext, IUserContext } from "../../Contexts/UserContext";
import { Box, Typography, Button } from "@mui/material";
import React, { useContext } from "react";
import img2 from '../../../assets/img2.png';

const Home = () => {
    const userContext = useContext(UserContext) as IUserContext;
    return (
        <Box
            sx={{
                flex: 1,
                backgroundImage: `url(${img2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                px: 2,
                textAlign: 'center'
            }}
        >
            <Typography
                variant="h4"
                fontWeight="bold"
                color="white"
                sx={{
                    textShadow: '1px 1px 4px black',
                    mb: 2,
                    maxWidth: 700
                }}
            >
                BEM VINDO AO STUDYPACE, {userContext.userInfo.name.toLocaleUpperCase()} <br />
                COMECE AGORA E TIRE O MÁXIMO DOS SEUS ESTUDOS HOJE MESMO!
            </Typography>

            <Button
                variant="contained"
                color="primary"
                size='large'
                onClick={() => userContext.setCurrentPage("criarRotina")}
                sx={{ borderRadius: 4, px: 4, fontWeight: 'bold' }}
            >
                Criar Nova Rotina 📘
            </Button>
        </Box>
    )
}

export default Home;