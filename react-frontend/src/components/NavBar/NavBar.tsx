import { Logout, Person, Settings } from "@mui/icons-material"
import { AppBar, Toolbar, Box, Tooltip, IconButton, Menu, MenuItem } from "@mui/material"
import React, { useContext } from "react"
import { IUserContext, UserContext, UserInfoInit } from "../Contexts/UserContext";
import logo1 from '../../assets/logo1.png'

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
        <AppBar position="static" sx={{ backgroundColor: '#1976d2', zIndex: 2 }
        }>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box
                    component="img"
                    src={logo1}
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
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleUpdateProfile}>Perfil {<Person />}</MenuItem>
                    <MenuItem onClick={handleLogoutProfile}>Sair {<Logout />}</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar >
    )
}

export default NavBar;