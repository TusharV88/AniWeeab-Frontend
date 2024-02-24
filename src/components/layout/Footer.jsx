import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import Logo from '../common/Logo';
import { drawerConfigs } from '../../utils/drawerConfigs';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Box
                sx={{
                    bgcolor: "#f0f0f0",
                    padding: "20px 0",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    flexDirection={isSmallScreen ? "column" : "row"}
                >

                    <Logo bgColour="#f0f0f0" width="70px" height="70px" isCickable={false} />

                    <Stack
                        spacing={1}
                        direction="row"
                    >
                        {drawerConfigs.main.map(item => (
                            <Button
                                key={item.state}
                                LinkComponent={Link}
                                to={item.path}
                                sx={{
                                    borderRadius: "5px",
                                    backgroundColor: item.path === location.pathname ? '#ff3838' : "",
                                    "&:hover": {
                                        backgroundColor: item.path === location.pathname ? '#ff3838' : '',
                                    },
                                    color: item.path === location.pathname ? "#f0f0f0" : "inherit"
                                }}
                            >
                                {item.display}
                            </Button>
                        ))}
                    </Stack>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        marginTop: "10px"
                    }}
                >
                    <Typography variant="body2" color="textSecondary" align="center">
                        Created By - Tushar Verma
                    </Typography>
                    <Typography variant="caption" color="textSecondary" align="center">
                        © {new Date().getFullYear()} AniWeeab
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default Footer;