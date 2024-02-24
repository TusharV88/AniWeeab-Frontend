import { useState } from 'react';
import stringAvatar from '../../utils/stringToChar';
import { Avatar, Box, Button, Divider, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Stack, Typography, useScrollTrigger } from "@mui/material"
import { Link, useLocation } from "react-router-dom";
import { headerConfigs } from '../../utils/headerConfigs';
import Logo from './Logo';
import '../../style/Navbar.css';

export const Header = ({ user, pageMatched }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const location = useLocation();

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 50,
    });


    const handleClick = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: "transparent",
            }} >
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: 'transparent',
                }}>
                    <Logo bgColour="transparent" width="70px" height="70px" isCickable={true} />

                    <Stack
                        direction="row"
                        spacing={3}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            marginLeft: "10px",
                        }}>

                        {headerConfigs.main.map(item => (
                            <Link
                                key={item.state}
                                className={`nav-link ${item.path === location.pathname ? 'active' : ''} ${trigger || pageMatched ? 'navScrollActive' : 'navScroll'}`}
                                to={item.path}
                            >
                                {item.letters.map(word => (
                                    <span
                                        key={word.id}
                                        className={`nav-char ${item.path === location.pathname ? 'active' : ''}`}
                                    >
                                        {word.letter}
                                    </span>
                                ))}
                            </Link>
                        ))}
                    </Stack>
                </Box>


                <Button
                    className='menuBtn'
                    onClick={handleClick}
                    sx={{
                        marginRight: "15px"
                    }}>
                    <Avatar
                        className='headerAvatar'
                        sx={{
                            bgcolor: "#ff3838",
                            width: '45px',
                            height: '45px',
                        }}>
                        {stringAvatar(user.name)}
                    </Avatar>
                </Button>


                <Menu
                    id="account-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    className='user-menu'
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    sx={{
                        zIndex: 3
                    }}
                >
                    <MenuList>
                        <MenuItem className='userMenuInfo' >
                            <ListItemIcon sx={{ marginRight: "10px" }}>
                                <Avatar
                                    className='headerAvatar'
                                    sx={{
                                        bgcolor: "#ff3838",
                                        width: "40px",
                                        height: "40px",
                                        fontSize: "medium",
                                    }}>
                                    {stringAvatar(user.name)}
                                </Avatar>
                            </ListItemIcon>

                            <ListItemText>
                                <Typography
                                    sx={{
                                        fontSize: "large",
                                        color: "#ff3838",
                                    }}
                                >{user.name}</Typography>

                                <Typography
                                    sx={{
                                        fontSize: "small",
                                        color: "GrayText",
                                    }}
                                >
                                    {user.email}
                                </Typography>
                            </ListItemText>
                        </MenuItem>
                        <Divider />

                        {headerConfigs.user.map(item => (
                            <MenuItem key={item.state} onClick={handleClose} component={Link} to={item.path}
                                sx={{
                                    borderTop: item.state === 'deleteUserAccount' ? '1px solid rgba(0, 0, 0, 0.12)' : '',
                                    marginTop: item.state === 'deleteUserAccount' ? '10px' : '',
                                }}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText sx={{ color: "#ff3838" }}>
                                    {item.display}
                                </ListItemText>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            </Box>
        </>
    )
}
