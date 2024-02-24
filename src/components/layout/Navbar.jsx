import { Header } from '../common/Header.jsx';
import { AniDrawer } from '../common/AniDrawer.jsx';
import { useTheme, useMediaQuery, AppBar, useScrollTrigger } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const user = useSelector(state => state.user);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [pageMatched, setPageMatched] = useState(false);

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 50,
    });

    const urlPath = useLocation().pathname;

    useEffect(() => {
        if (urlPath === '/' || urlPath === '/anime' || urlPath === '/manga' || urlPath.search(/\d+/) !== -1) {
            setPageMatched(false);
        }
        else {
            setPageMatched(true);
        }
    }, [urlPath])


    const navbarStyles = {
        backgroundColor: trigger ? '#eaddd1' : 'transparent',
        transition: 'background-color 0.3s ease-in-out',
    };


    return (
        <>
            <AppBar style={navbarStyles} sx={{ boxShadow: trigger ? '' : 'none', zIndex: 3 }}>
                {isSmallScreen ? (
                    <AniDrawer user={user} pageMatched={pageMatched} />
                ) : (
                    <Header pageMatched={pageMatched} user={user} />
                )}
            </AppBar>
        </>
    );
}

export default Navbar;