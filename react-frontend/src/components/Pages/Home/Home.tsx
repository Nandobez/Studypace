import { UserContext, IUserContext } from "../../Contexts/UserContext";
import { Box, Typography, Button } from "@mui/material";
import React, { useContext } from "react";
import img from '../../../assets/img.png';
import PixelIcon from "../../Icons/PixelIcon";
import CalendarMultipleCheck from 'pixelarticons/svg/calendar-multiple-check.svg?react';


const Home = () => {
    const userContext = useContext(UserContext) as IUserContext;
    return (
        <Box
            sx={{
                flex: 1,
                backgroundImage: `url(${img})`,
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
                fontFamily={"Pixellari"}
                sx={{
                    textShadow: '4px 4px 0px black',
                    mb: 2,
                    maxWidth: 700
                }}
            >
                BEM VINDO AO STUDYPACE, {userContext.userInfo.user.name.toLocaleUpperCase()} <br />
                COMECE AGORA E TIRE O MÁXIMO DOS SEUS ESTUDOS HOJE MESMO!
            </Typography>

            <Button
                variant="contained"
                color="primary"
                size='large'
                disableElevation
                onClick={() => userContext.setCurrentPage("criarRotina")}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    fontWeight: 'bold',
                    px: 2,
                    py: 1
                }}
            >
                Criar Nova Rotina
                <PixelIcon Icon={CalendarMultipleCheck} style={{imageRendering: 'pixelated' }} />
            </Button>
        </Box >
    )
}

export default Home;