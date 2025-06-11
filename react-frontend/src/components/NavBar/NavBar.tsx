import { AppBar, Toolbar, Box, Tooltip, IconButton, Menu, MenuItem } from "@mui/material"
import React, { useContext } from "react"
import { IUserContext, UserContext, UserInfoInit } from "../Contexts/UserContext";
import LOGO_StudyPace_Branco from '../../assets/LOGO_StudyPace_Branco.png'
import PixelIcon from "../Icons/PixelIcon";
import User from 'pixelarticons/svg/user.svg?react';
import Logout from 'pixelarticons/svg/logout.svg?react';
import { Settings } from "@mui/icons-material";

const NavBar = () => {
    const userContext = useContext(UserContext) as IUserContext;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUpdateProfile = () => {
        userContext.setCurrentPage("updateProfile")
    }

    const handleLogoutProfile = () => {
        userContext.setUserInfo(UserInfoInit)
        userContext.setCurrentPage("home")
    }

    return (
        <AppBar position="static" elevation={0} sx={{ boxShadow: "4px 4px 0px #ffcc34" }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box
                    component="img"
                    src={LOGO_StudyPace_Branco}
                    alt="StudyPace Logo"
                    sx={{ height: 50 }}
                    onClick={() => userContext.setCurrentPage("home")}
                />

                <Tooltip title={"Sair"}>
                    <IconButton
                        onClick={handleClick}
                        color='inherit'
                    >
                        <Settings />
                    </IconButton>
                </Tooltip>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    elevation={0}
                >
                    <MenuItem onClick={handleUpdateProfile} sx={{ gap: 1 }}>{<PixelIcon Icon={User} />}Perfil</MenuItem>
                    <MenuItem onClick={handleLogoutProfile} sx={{ gap: 1 }}>{<PixelIcon Icon={Logout} />}Sair</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar >
    )
}

export default NavBar;