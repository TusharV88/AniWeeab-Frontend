import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"

const MediaTitleBar = ({ heading, slides = [] }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    function isValidState(state) {
        if (state === 'Reviews' || state === 'Favorites') {
            return state + `(${slides.length})`;
        }

        return state;
    }


    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%'
            }}
        >
            <Stack
                spacing={0}
                paddingLeft='10px'
            >
                <Typography
                    variant={isSmallScreen ? "h5" : "h4"}
                    sx={{
                        color: '#593030',
                        fontWeight: 700,
                        letterSpacing: '.2rem'
                    }}
                >
                    {isValidState(heading)}
                </Typography>

                <Box className='headBar' />
            </Stack>
        </Box>
    )
}

export default MediaTitleBar;