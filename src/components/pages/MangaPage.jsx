import MainSlider from "../common/MainSlider.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLazyMangaDataQuery, useLazySeasonsNowMainQuery } from "../../redux/services/manga.js";
import { incSeasonsMangaMain } from "../../redux/slices/Manga/SeasonsNowMain/seasonsNowMainLimit.js";
import { initSeasonsNowMangaMain } from "../../redux/slices/Manga/SeasonsNowMain/seasonsNowMainSlice.js";
import { getToken } from "../../utils/userToken.js";
import { Box, Button, CircularProgress, Grid, Pagination, Stack, useMediaQuery, useTheme } from "@mui/material";
import { toast } from "react-toastify";
import { decMedia, incMedia } from "../../redux/slices/mediaLimit.js";
import { initMedia, resetMedia } from "../../redux/slices/mediaSlice.js";
import MediaTitleBar from "../common/MediaTitleBar.jsx";
import { mediaConfigs } from "../../utils/mediaConfigs.jsx";
import ItemContent from "../common/ItemContent.jsx";
import AniLoader from "../common/AniLoader.jsx";
import { startLoading, stopLoading } from "../../redux/slices/aniLoaderSlice.js";


const MangaPage = () => {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const token = getToken();
    const dispatch = useDispatch();

    const [mediaState, setMediaState] = useState('Upcoming');
    const [pageNo, setPageNo] = useState(1);
    const [pages, setPages] = useState(1);

    const [isLoading, setIsLoading] = useState(true);
    const [onLoad, setOnLoad] = useState(false);
    const [loader, setLoader] = useState(false);

    const [seasonMainTrigger] = useLazySeasonsNowMainQuery();
    const [mangaTrigger] = useLazyMangaDataQuery();

    const seasonsMainData = useSelector((state) => state.mangaSeasonsNowMain);
    const mediaData = useSelector((state) => state.media);


    const seasonsMainStateLength = seasonsMainData.length;
    const mediaStateLength = mediaData.length;


    const seasonsMainLimit = useSelector((state) => state.mangaSeasonsNowMainLimit);
    const mediaLimit = useSelector((state) => state.mediaLimit);



    const toggleMediaState = state => {
        setMediaState(state);
        setOnLoad(true);
        setPageNo(1);
        setLoader(true);
        dispatch(decMedia());
        dispatch(resetMedia());
    }


    const pageHandler = (event, value) => {
        setPageNo(value);
        setOnLoad(true);
        dispatch(decMedia());
    };



    useEffect(() => {
        dispatch(startLoading());

        if (seasonsMainLimit === 0) {
            dispatch(incSeasonsMangaMain());
            seasonMainTrigger(token)
                .unwrap()
                .then((fulfilled) => {
                    if (fulfilled !== undefined) {
                        dispatch(initSeasonsNowMangaMain(fulfilled.seasons));
                    }
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
    }, []);



    useEffect(() => {
        if (mediaLimit === 0 && seasonsMainStateLength > 0) {
            dispatch(incMedia());
            mangaTrigger({ token, mediaState, pageNo })
                .unwrap()
                .then((fulfilled) => {
                    if (fulfilled !== undefined) {
                        dispatch(initMedia(fulfilled.data));
                        setPages(fulfilled.pagination.last_visible_page);
                    }
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
    }, [seasonsMainStateLength]);



    useEffect(() => {
        if (mediaLimit === 0 && onLoad) {
            dispatch(incMedia());
            mangaTrigger({ token, mediaState, pageNo })
                .unwrap()
                .then((fulfilled) => {
                    if (fulfilled !== undefined) {
                        dispatch(resetMedia());
                        dispatch(initMedia(fulfilled.data));
                        setPageNo(fulfilled.pagination.current_page);
                        setPages(fulfilled.pagination.last_visible_page);
                        setOnLoad(false);
                        setLoader(false);
                    }
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


    useEffect(() => {
        if (seasonsMainStateLength > 0 && mediaStateLength > 0) {
            setIsLoading(false);
            dispatch(stopLoading());
        }
    }, [seasonsMainStateLength, mediaStateLength]);



    return (
        <>
            {isLoading ? (
                <AniLoader />
            ) : (
                <>
                    <MainSlider slides={seasonsMainStateLength > 0 ? seasonsMainData[0] : []} />


                    <Stack
                        spacing={5}
                        margin='100px 0'
                        width='100%'
                    >
                        <Stack spacing={5}>
                            <Stack
                                direction='row'
                                spacing={isSmallScreen ? 2 : 5}
                                useFlexGap
                                flexWrap='wrap'
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                {mediaConfigs.main.map(item => (
                                    <Button
                                        key={item.state}
                                        variant='outlined'
                                        size={isSmallScreen ? 'medium' : 'large'}
                                        className={item.display === mediaState ? 'mediaTypeBtnActive' : 'mediaTypeBtn'}
                                        disabled={loader || onLoad}
                                        onClick={() => { toggleMediaState(item.display) }}
                                    >
                                        {item.display}
                                    </Button>
                                ))}
                            </Stack>
                        </Stack>


                        <Stack spacing={3}>
                            <MediaTitleBar heading={mediaState} />

                            {loader ?
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
                                :
                                <Box padding='0 10px'>
                                    <Grid container >
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
                                            : mediaData[0].map((item, index) => (
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
                                            ))
                                        }

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
                                </Box>
                            }
                        </Stack>
                    </Stack>
                </>
            )}
        </>
    );
};

export default MangaPage;
