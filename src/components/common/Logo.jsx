import { Avatar, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import LogoImage from '../../assets/logo2.png';

const Logo = ({ bgColour, width, height, isCickable }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: { bgColour },
                textDecoration: "none"
            }}
            component={isCickable ? Link : ""}
            to={'/'}
        >
            <Avatar
                alt='AniWeeab_Logo'
                src={LogoImage}
                sx={{
                    width: { width },
                    height: { height },
                    position: "relative",
                    left: "17px"
                }}
                variant='square'
            />
            <Typography
                variant='h5'
                sx={{
                    position: 'relative',
                    left: '-20px',
                    fontStyle: "italic",
                    fontSize: "19px",
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
    )
}

export default Logo