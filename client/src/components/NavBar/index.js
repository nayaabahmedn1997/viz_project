import { useTheme } from '@emotion/react';
import {AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography} from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import FlexBetween from '../FlexBetween';
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined

} from '@mui/icons-material';
import { setMode } from '../../store/modeSlice';
import profileImage from '../../assets/profile.jpeg';

const NavBar = (
    {
        user,
        isSideBarOpen,
        setIsSideBarOpen
    }
) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <AppBar
            sx={{
                position: "static",
                background: "none",
                boxShadow: "none"
            }}
        >
            <Toolbar
                sx={{ justifyContent: "space-between" }}
            >
                {/* Left side */}
                <FlexBetween
                 gap="5rem"
                >
                    <IconButton
                        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                    >
                        <MenuIcon />
                    </IconButton>

                    <FlexBetween
                     backgroundColor={theme.palette.background.alt}
                     borderRadius="9px"
                     gap="3rem"
                     p="0.1rem 1.5rem"
                     
                    >
                        <InputBase placeholder='Search...' />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>

                </FlexBetween>


                {/* Right side */}
                <FlexBetween gap="1.5rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {
                            theme.palette.mode === 'dark' ?
                                (<DarkModeOutlined sx={{ fontSize: "25px" }} />)
                                :
                                (<LightModeOutlined sx={{ fontSize: "25px" }} />)
                        }
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined sx={{ fontSize: "25px" }} />
                    </IconButton>
                    <FlexBetween>
                        <Button
                            onClick={handleClick}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                textTransform: "none",
                                gap: "1rem"
                            }}
                        >
                            <Box
                                component="img"
                                alt="profile"
                                src={profileImage}
                                height="32px"
                                width="32px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                            />
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.85rem"
                                    sx={{ color: theme.palette.secondary[100] }}
                                >
                                    {user.name}
                                </Typography>
                                <Typography
                                    fontSize="0.75rem"
                                    sx={{ color: theme.palette.secondary[200] }}
                                >
                                    {user.occupation}
                                </Typography>
                            </Box>
                            <ArrowDropDownOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                            />

                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}

                        >
                            <MenuItem
                                onClick={handleClose}
                            >
                                Log Out
                            </MenuItem>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>

        </AppBar>
    )
}

export default NavBar