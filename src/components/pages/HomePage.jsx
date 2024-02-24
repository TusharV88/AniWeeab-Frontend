import MainSlider from "../common/MainSlider.jsx";
import MediaItem from "../common/MediaItem.jsx";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/userToken.js";
import { useLazyMostPopularQuery, useLazyRandomFavoriteQuery, useLazySeasonsNowQuery } from "../../redux/services/home.js";
import { toast } from "react-toastify";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { initSeasonsNow } from "../../redux/slices/Home/SeasonsNow/seasonsNowSlice.js";
import { incSeaons } from "../../redux/slices/Home/SeasonsNow/seasonsLimitSlice.js";
import { incPopular } from "../../redux/slices/Home/Popular/popularLimit.js";
import { initPopularAnime } from "../../redux/slices/Home/Popular/popularAnimeSlice.js";
import { initPopularManga } from "../../redux/slices/Home/Popular/popularMangaSlice.js";
import { incFavorite } from "../../redux/slices/Home/Favorite/FavoriteLimit.js";
import { initFavoriteAnime } from "../../redux/slices/Home/Favorite/FavoriteAnimeSlice.js";
import { initFavoriteManga } from "../../redux/slices/Home/Favorite/FavoriteMangaSlice.js";
import AniLoader from "../common/AniLoader.jsx";
import { startLoading, stopLoading } from '../../redux/slices/aniLoaderSlice.js';


const HomePage = () => {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const token = getToken();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const [seasonTrigger] = useLazySeasonsNowQuery();
    const [popularTrigger] = useLazyMostPopularQuery();
    const [favoriteTrigger] = useLazyRandomFavoriteQuery();

    const seasonsData = useSelector((state) => state.seasonsNow);
    const popularAnimeData = useSelector((state) => state.popularAnime);
    const popularMangaData = useSelector((state) => state.popularManga);
    const favoriteAnimeData = useSelector((state) => state.favoriteAnime);
    const favoriteMangaData = useSelector((state) => state.favoriteManga);

    const seasonsStateLength = seasonsData.length;
    const popularAnimeStateLength = popularAnimeData.length;
    const popularMangaStateLength = popularMangaData.length;
    const favoriteAnimeStateLength = favoriteAnimeData.length;
    const favoriteMangaStateLength = favoriteMangaData.length;

    const seasonsLimit = useSelector((state) => state.seasonsLimit);
    const popularLimit = useSelector((state) => state.popularLimit);
    const favoriteLimit = useSelector((state) => state.favoriteLimit);


    async function sleep(seconds) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }


    useEffect(() => {
        dispatch(startLoading());

        if (seasonsLimit === 0) {
            dispatch(incSeaons());
            seasonTrigger(token)
                .unwrap()
                .then((fulfilled) => {
                    if (fulfilled !== undefined) {
                        dispatch(initSeasonsNow(fulfilled.data));
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
        async function fetchData() {
            await sleep(2);

            if (popularLimit === 0 && seasonsStateLength > 0) {
                dispatch(incPopular());
                popularTrigger(token)
                    .unwrap()
                    .then((fulfilled) => {
                        if (fulfilled !== undefined) {
                            dispatch(initPopularAnime(fulfilled.topAnime));
                            dispatch(initPopularManga(fulfilled.topManga));
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
        }

        fetchData();
    }, [seasonsStateLength]);



    useEffect(() => {
        async function fetchData() {
            await sleep(2);

            if (favoriteLimit === 0 && popularAnimeStateLength > 0 && popularMangaStateLength > 0) {
                dispatch(incFavorite());
                favoriteTrigger(token)
                    .unwrap()
                    .then((fulfilled) => {
                        if (fulfilled !== undefined) {
                            dispatch(initFavoriteAnime(fulfilled.topAnime));
                            dispatch(initFavoriteManga(fulfilled.topManga));
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
        }

        fetchData();
    }, [popularAnimeStateLength, popularMangaStateLength]);



    useEffect(() => {
        if (seasonsStateLength > 0 && popularAnimeStateLength > 0 && popularMangaStateLength > 0 && favoriteAnimeStateLength && favoriteMangaStateLength > 0) {
            setIsLoading(false);
            dispatch(stopLoading());
        }
    }, [seasonsStateLength, popularAnimeStateLength, popularMangaStateLength, favoriteAnimeStateLength, favoriteMangaStateLength]);


    return (
        <>
            {isLoading ? (
                <AniLoader />
            ) : (
                <>
                    <MainSlider slides={seasonsStateLength > 0 ? seasonsData[0] : []} />

                    <Box
                        sx={{
                            position: 'relative',
                            marginTop: '100px',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Box sx={{ height: '3px', backgroundColor: '#593030', borderRadius: '10px', width: '80%' }} />

                        <Typography
                            textAlign='center'
                            variant={isSmallScreen ? 'h5' : 'h4'}
                            sx={{
                                position: 'absolute',
                                fontWeight: '700',
                                color: '#ff3838',
                                backgroundColor: '#eaddd1',
                                padding: '10px',
                                letterSpacing: '.2rem',
                                top: isSmallScreen ? '-26px' : '-32px',
                            }}
                        >
                            Anime
                        </Typography>
                    </Box>


                    <MediaItem heading={'Most Popular'} slides={popularAnimeStateLength ? popularAnimeData[0] : []} />
                    <MediaItem heading={'Top Favorite'} slides={favoriteAnimeStateLength ? favoriteAnimeData[0] : []} />



                    <Box
                        sx={{
                            position: 'relative',
                            marginTop: '150px',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Box sx={{ height: '3px', backgroundColor: '#593030', borderRadius: '10px', width: '80%' }} />

                        <Typography
                            textAlign='center'
                            variant={isMediumScreen ? 'h5' : 'h4'}
                            sx={{
                                position: 'absolute',
                                fontWeight: '700',
                                color: '#ff3838',
                                backgroundColor: '#eaddd1',
                                padding: '10px',
                                letterSpacing: '.2rem',
                                top: isMediumScreen ? '-26px' : '-32px',
                            }}
                        >
                            Manga
                        </Typography>
                    </Box>


                    <MediaItem heading={'Most Popular'} slides={popularMangaStateLength ? popularMangaData[0] : []} />
                    <MediaItem heading={'Top Favorite'} slides={favoriteMangaStateLength ? favoriteMangaData[0] : []} />
                </>
            )}
        </>
    );
};

export default HomePage;