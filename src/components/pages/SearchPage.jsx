import { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Grid, Pagination, Stack, TextField, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import { searchConfigs } from '../../utils/searchConfigs';
import '../../style/SearchPage.css';
import ItemContent from '../common/ItemContent';
import { useLazySearchMediaQuery } from '../../redux/services/search';
import { getToken } from '../../utils/userToken';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { stopLoading } from '../../redux/slices/aniLoaderSlice';


const SearchPage = () => {
    const dispatch = useDispatch();
    const token = getToken();

    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [slides, setSlides] = useState([]);
    const [query, setQuery] = useState('');

    const [pageNo, setPageNo] = useState(1);
    const [pages, setPages] = useState(1);
    const [onLoad, setOnLoad] = useState(false);

    const [mediaState, setMediaState] = useState('anime');
    const [mediaTypeState, setMediaTypeState] = useState('tv');

    const toggleMediaState = state => setMediaState(state);
    const toggleMediaTypeState = state => setMediaTypeState(state);


    const [searchTrigger] = useLazySearchMediaQuery();

    const pageHandler = (event, value) => {
        // window.scrollTo(0, 0);
        setOnLoad(true);
        setPageNo(value);
    };


    useEffect(() => {
        dispatch(stopLoading());
    }, []);



    useEffect(() => {
        if (onLoad) {
            searchTrigger({ token, mediaTypeState, query, pageNo })
                .unwrap()
                .then((fulfilled) => {
                    setSlides(fulfilled.data);
                    setPageNo(fulfilled.pagination.current_page);
                    setOnLoad(false);
                })
                .catch((rejected) => {
                    toast.error(
                        <div>
                            <p>Status Code: {rejected.data.statusCode}</p>
                            <p>Error: {rejected.data.msg}</p>
                        </div>
                        , { position: 'bottom-left' });
                });
        }
    }, [onLoad]);


    const queryHandler = event => {
        const { name, value } = event.target;

        setQuery(value);
        setPageNo(1);
    };



    useEffect(() => {
        const timer = setTimeout(() => {
            if (!(query.trim() === '')) {
                searchTrigger({ token, mediaTypeState, query, pageNo })
                    .unwrap()
                    .then((fulfilled) => {
                        setSlides(fulfilled.data);
                        setPageNo(fulfilled.pagination.current_page);
                        setPages(fulfilled.pagination.last_visible_page);
                    })
                    .catch((rejected) => {
                        toast.error(
                            <div>
                                <p>Status Code: {rejected.data.statusCode}</p>
                                <p>Error: {rejected.data.msg}</p>
                            </div>
                            , { position: 'bottom-left' });
                    });
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [query]);


    useEffect(() => {
        if (mediaState === 'manga') {
            setMediaTypeState(searchConfigs.mangaType[0].state);
        }
        else if (mediaState === 'anime') {
            setMediaTypeState(searchConfigs.animeType[0].state);
        }
    }, [mediaState]);


    return (
        <>
            <Toolbar />

            <Box
                margin='40px 0'
                minHeight='100vh'
            >
                <Stack
                    spacing={4}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Stack spacing={2}>
                        <Stack
                            direction='row'
                            spacing={5}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            {searchConfigs.main.map(item => (
                                <Button
                                    key={item.state}
                                    startIcon={item.icon}
                                    variant='outlined'
                                    size={isSmallScreen ? 'medium' : 'large'}
                                    className={item.state === mediaState ? 'mediaTypeBtnActive' : 'mediaTypeBtn'}
                                    onClick={() => { toggleMediaState(item.state) }}
                                >
                                    {item.display}
                                </Button>
                            ))}
                        </Stack>

                        <Stack
                            direction='row'
                            spacing={2}
                            useFlexGap
                            flexWrap='wrap'
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            {mediaState === 'anime' ? (
                                searchConfigs.animeType.map(item => (
                                    <Button
                                        key={item.state}
                                        variant='outlined'
                                        size={isSmallScreen ? 'small' : 'medium'}
                                        className={item.state === mediaTypeState ? 'mediaTypeBtnActive' : 'mediaTypeBtn'}
                                        onClick={() => { toggleMediaTypeState(item.state) }}
                                    >
                                        {item.display}
                                    </Button>
                                ))
                            ) : (
                                mediaState === 'manga' ? (
                                    searchConfigs.mangaType.map(item => (
                                        <Button
                                            key={item.state}
                                            variant='outlined'
                                            size={isSmallScreen ? 'small' : 'medium'}
                                            className={item.state === mediaTypeState ? 'mediaTypeBtnActive' : 'mediaTypeBtn'}
                                            onClick={() => { toggleMediaTypeState(item.state) }}
                                        >
                                            {item.display}
                                        </Button>
                                    ))
                                ) : null
                            )}
                        </Stack>
                    </Stack>

                    <TextField
                        label='Search'
                        name='search'
                        value={query}
                        onChange={queryHandler}
                        className='formInput'
                        InputLabelProps={{ className: 'textfield__label' }}
                        sx={{
                            width: '95%'
                        }}
                    />

                    <Grid container sx={{ width: '95%' }}>
                        {onLoad ?
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '10vh',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <CircularProgress color='error' />
                            </Box>
                            : slides.map((item, index) => (
                                <Grid
                                    key={index}
                                    item
                                    xs={6}
                                    sm={4}
                                    md={3}
                                    sx={{
                                        padding: '5px'
                                    }}
                                >
                                    <ItemContent item={item} />
                                </Grid>
                            ))}

                        {pages > 1 ?
                            <Box
                                sx={{
                                    width: '100%',
                                    marginTop: '20px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Pagination
                                    count={pages}
                                    page={pageNo}
                                    variant="outlined"
                                    shape="rounded"
                                    size={isSmallScreen ? 'small' : isMediumScreen ? 'medium' : 'large'}
                                    color='error'
                                    onChange={pageHandler}
                                    disabled={onLoad}
                                />
                            </Box>
                            : null}
                    </Grid>
                </Stack>
            </Box>
        </>
    )
}

export default SearchPage;