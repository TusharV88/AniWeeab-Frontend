import { Avatar, Box, LinearProgress, Typography, useMediaQuery, useTheme } from '@mui/material';
import LogoImage from '../../assets/logo2.png';

const AniLoader = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


    return (
        <Box
            sx={{
                position: 'relative',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <LinearProgress
                color='error'
                sx={{
                    width: '100%',
                    position: 'absolute',
                    top: '0',
                }}
            />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: '#eaddd1',
                    textDecoration: "none"
                }}
            >
                <Avatar
                    alt='AniWeeab_Logo'
                    src={LogoImage}
                    sx={{
                        width: isSmallScreen ? '90px' : '120px',
                        height: isSmallScreen ? '90px' : '120px',
                        position: "relative",
                        left: "17px"
                    }}
                    variant='square'
                />
                <Typography
                    variant='h5'
                    sx={{
                        position: 'relative',
                        left: isSmallScreen ? '-25px' : '-43px',
                        fontStyle: "italic",
                        fontSize: isSmallScreen ? "20px" : "30px",
                        color: "#FF3838",
                        letterSpacing: "1px"
                    }}
                ><Typography
                    variant='span'
                    sx={{
                        position: 'relative',
                        color: "#eaddd1"
                    }}>An</Typography>iWeeab</Typography>
            </Box>
        </Box>
    )
}

export default AniLoader;