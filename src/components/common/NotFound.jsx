import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { stopLoading } from '../../redux/slices/aniLoaderSlice';

const NotFound = () => {
    const dispatch = useDispatch();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


    useEffect(() => {
        dispatch(stopLoading());
    }, []);


    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Stack
                spacing={2}
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant={isSmallScreen ? 'h5' : 'h3'}
                    fontWeight={700}
                    color='#593030'
                >
                    <Typography variant='span' color='#ff3838'>Error 404</Typography> - Page Not Found
                </Typography>

                <Typography variant={isSmallScreen ? 'body2' : 'h6'} textAlign='center' width={isSmallScreen ? '80%' : '60%'} color='#030303'>
                    Looks like the page you're searching for is in another dimension. Feel free to return to the <Link to='/' className='formLink'>HomePage</Link> and continue your anime adventure.
                </Typography>
            </Stack>
        </Box>
    )
}

export default NotFound;