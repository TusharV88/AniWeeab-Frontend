import { useLocation, useNavigate } from "react-router-dom"
import { clearToken } from "../../utils/userToken";
import { toast } from "react-toastify";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";


const LogoutPage = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


    useEffect(() => {
        if (pathname === '/logout') {
            clearToken();

            navigate("/login");
            toast.success(
                <p
                    style={{
                        color: '#593030',
                        fontWeight: 700
                    }}
                >
                    👋 Farewell, fellow otaku! You've successfully logged out. ✨
                </p>
                , { position: 'bottom-left' });
        }
    }, [pathname, navigate]);



    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <Typography variant={isSmallScreen ? "h5" : "h3"} color='#593030'>Logging Out...</Typography>
        </Box>
    );
}

export default LogoutPage;