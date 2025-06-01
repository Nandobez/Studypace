import React, { useContext } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    InputBase,
    IconButton,
    Button,
    Paper,
    Tooltip,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import logo1 from '../../../assets/logo1.png';
import { UserContext, IUserContext } from '../../Contexts/UserContext';
import { Logout, Settings } from '@mui/icons-material';
import Home from '../Home/Home';
import CriarRotina from '../CriarRotina/CriarRotina';
import CriarRotinaProvider from '../../Contexts/CriarRotinaContext';
import RotinaResumo from '../VerRotina/RotinaResumo';
import RotinaResumoProvider from '../../Contexts/RotinaResumoContext';
import NavBar from "../../NavBar/NavBar";
import Profile from '../Profile/Profile';

// Campo de busca estilizado
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(1),
    width: '100%',
    maxWidth: 250,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
}));

const DashboardPage = () => {
    const userContext = useContext(UserContext) as IUserContext;
    return (
        <RotinaResumoProvider>
            {
                userContext.currentPage === "home" ?
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
                        <>
                            <NavBar />
                            <Home />
                        </>
                    </Box>
                    :
                    userContext.currentPage === "criarRotina" ?
                        <CriarRotinaProvider>]
                            <CriarRotina />
                        </CriarRotinaProvider>
                        :
                        userContext.currentPage === "verRotina" ?
                            <RotinaResumo />
                            :
                            <Profile />
            }
        </RotinaResumoProvider>




    );
};

export default DashboardPage;
