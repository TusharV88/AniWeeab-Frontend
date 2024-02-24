import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Typography, useScrollTrigger } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from '@mui/icons-material';
import { useState } from 'react';
import { drawerConfigs } from '../../utils/drawerConfigs';
import stringAvatar from '../../utils/stringToChar';
import Logo from '../common/Logo';


export const AniDrawer = ({ user, pageMatched }) => {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 50,
    });

    const toggleDrawer = () => setOpen(!open);


    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            zIndex: 3
        }} >

            <IconButton
                onClick={toggleDrawer}
                sx={{
                    marginLeft: "20px",
                }}>
                <Menu className={trigger || pageMatched ? 'menuScrollActive' : 'menuScroll'} />
            </IconButton>

            <SwipeableDrawer
                className='user-drawer'
                anchor="left"
                open={open}
                onClose={toggleDrawer}
                onOpen={toggleDrawer}
            >
                <Box sx={{ bgcolor: "transparent" }}>

                    <Logo bgColour="transparent" width="70px" height="70px" isCickable={true} />
                    <Divider />

                    <ListItem>
                        <ListItemIcon>
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
                                    fontSize: "medium",
                                    color: "#ff3838",
                                }}
                            >
                                {user.name}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "small",
                                    color: "GrayText",
                                    overflowWrap: "break-word"
                                }}
                            >
                                {user.email}
                            </Typography>
                        </ListItemText>
                    </ListItem>

                    <Divider />

                    <List sx={{ paddingX: "30px", marginTop: "20px" }}>
                        <Typography variant="h6" marginBottom="20px" sx={{ color: "#593030" }}>MENU</Typography>

                        {drawerConfigs.main.map(item => (
                            <ListItem key={item.state} disablePadding>
                                <ListItemButton
                                    LinkComponent={Link}
                                    to={item.path}
                                    onClick={toggleDrawer}
                                    sx={{
                                        borderRadius: "10px",
                                        backgroundColor: item.path === location.pathname ? '#ff3838' : "",
                                        "&:hover": {
                                            backgroundColor: item.path === location.pathname ? '#ff3838' : '',
                                        }
                                    }}>
                                    <ListItemIcon sx={{
                                        color: item.path === location.pathname ? '#eaddd1' : "#ff3838"
                                    }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.display}
                                        sx={{
                                            color: item.path === location.pathname ? '#eaddd1' : "#593030",
                                        }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <List sx={{ paddingX: "30px", marginTop: "20px" }}>
                        <Typography variant="h6" marginBottom="20px" sx={{ color: "#593030" }}>PERSONAL</Typography>

                        {drawerConfigs.user.map(item => (
                            <ListItem key={item.state} disablePadding>
                                <ListItemButton
                                    LinkComponent={Link}
                                    to={item.path}
                                    onClick={toggleDrawer}
                                    sx={{
                                        borderRadius: "5px",
                                        backgroundColor: item.path === location.pathname ? '#ff3838' : "",
                                        "&:hover": {
                                            backgroundColor: item.path === location.pathname ? '#ff3838' : '',
                                        }
                                    }}>
                                    <ListItemIcon sx={{
                                        color: item.path === location.pathname ? '#eaddd1' : "#ff3838"
                                    }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.display}
                                        sx={{
                                            color: item.path === location.pathname ? '#eaddd1' : "#593030",
                                        }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </SwipeableDrawer>
            <Logo bgColour="#eaddd1" width="70px" height="70px" isCickable={true} />
        </Box>
    )
}
