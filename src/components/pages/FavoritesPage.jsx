import { Box, Grid, Stack, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import ItemContent from '../common/ItemContent';
import { useEffect, useState } from 'react';
import MediaTitleBar from '../common/MediaTitleBar';
import { useFavoriteDeleteMutation, useLazyFavoriteByUserQuery } from '../../redux/services/favorite';
import { getToken } from '../../utils/userToken';
import { useDispatch, useSelector } from 'react-redux';
import { initUserFavorite, resetUserFavorite } from "../../redux/slices/userFavoriteSlice.js";
import { decUserFavorite, incUserFavorite } from "../../redux/slices/userFavoriteLimit.js";
import { LoadingButton } from '@mui/lab';
import { DeleteRounded } from '@mui/icons-material';
import { toast } from 'react-toastify';
import AniLoader from '../common/AniLoader.jsx';
import { stopLoading } from '../../redux/slices/aniLoaderSlice.js';


const FavoritesPage = () => {
    const token = getToken();
    const dispatch = useDispatch();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const [slides, setSlides] = useState([]);
    const [isFetcher, setIsFetcher] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [favItemID, setFavItemID] = useState(null);


    const [favoriteRemove, { data, error, isSuccess }] = useFavoriteDeleteMutation();
    const [favoriteTrigger, { isSuccess: favIsSuccess }] = useLazyFavoriteByUserQuery();

    const userFavoritesData = useSelector((state) => state.userFavorites);
    const userFavoritesLimit = useSelector((state) => state.userFavoritesLimit);

    const userFavoritesStateLength = Array.isArray(userFavoritesData) && userFavoritesData.length > 0 ? userFavoritesData[0].length : 0;

    const slidesLength = Array.isArray(slides) ? slides.length : 0;


    function favoriteDeleteHandler(mediaID) {
        setFavItemID(mediaID);
        dispatch(decUserFavorite());

        favoriteRemove({ token, mediaID });
    }



    useEffect(() => {
        if (slidesLength === 0 || (isSuccess && data)) {
            if (userFavoritesLimit === 0) {
                setIsFetcher(true);
                dispatch(incUserFavorite());
                favoriteTrigger(token)
                    .unwrap()
                    .then((fulfilled) => {
                        if (fulfilled !== undefined) {
                            dispatch(resetUserFavorite());
                            dispatch(initUserFavorite(fulfilled.userFavorites));
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
    }, [data, isSuccess, slidesLength, dispatch]);



    useEffect(() => {
        if (data) {
            toast.success(
                <div>
                    <p style={{ color: '#593030', fontWeight: 700 }}>{data.msg}</p>
                    <p style={{ color: '#ff3838', fontWeight: 700 }}>{data.title}</p>
                </div>
                , { position: 'bottom-left' });
        } else if (error) {
            toast.error(error.data.msg, { position: 'bottom-left' });
        }
    }, [data, error]);



    useEffect(() => {
        if (isFetcher) {
            if (favIsSuccess && (userFavoritesStateLength > 0 || userFavoritesStateLength === 0)) {
                setSlides(userFavoritesData[0]);
                if (slidesLength > 0 || slidesLength === 0) {
                    setIsLoading(false);
                    dispatch(stopLoading());
                }
            }
        } else {
            if (!favIsSuccess && (userFavoritesStateLength > 0 || userFavoritesStateLength === 0)) {
                setSlides(userFavoritesData[0]);
                if (slidesLength > 0 || slidesLength === 0) {
                    setIsLoading(false);
                    dispatch(stopLoading());
                }
            }
        }
    }, [isFetcher, favIsSuccess, userFavoritesStateLength, slidesLength]);


    return (
        <>
            {isLoading ? (
                <AniLoader />
            ) : (
                <>
                    <Toolbar />

                    <Box
                        sx={{
                            minHeight: '100vh',
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center',
                            flexDirection: 'column',
                            marginBottom: '50px',
                        }}
                    >
                        <Stack
                            spacing={4}
                            marginTop='50px'
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                width: '100%',
                            }}
                        >
                            <MediaTitleBar heading={'Favorites'} slides={slides} />

                            {slidesLength > 0 ?
                                <Grid container sx={{ width: '100%' }}>
                                    {slides.map(item => (
                                        <Grid
                                            key={item.mediaID}
                                            item
                                            xs={6}
                                            sm={4}
                                            md={3}
                                            sx={{
                                                padding: isSmallScreen ? '5px' : '10px'
                                            }}
                                        >
                                            <ItemContent item={item} label='favorites' isRecommend={false} />

                                            <LoadingButton
                                                loading={favItemID === item._id}
                                                loadingPosition="center"
                                                disabled={favItemID === item._id}
                                                variant='contained'
                                                startIcon={<DeleteRounded sx={{ visibility: favItemID === item._id ? 'hidden' : 'visible' }} />}
                                                className={favItemID === item._id ? "favDelLoadBtn" : "favDelBtn"}
                                                onClick={() => favoriteDeleteHandler(item._id)}
                                                size={isSmallScreen ? "small" : "medium"}
                                                sx={{ width: '100%', fontWeight: '700', margin: '5px 0 10px 0' }}
                                            >
                                                <span className={favItemID === item._id ? "disSpan" : ""}>Remove</span>
                                            </LoadingButton>
                                        </Grid>
                                    ))}
                                </Grid> :
                                <Typography
                                    textAlign='center'
                                    variant={isSmallScreen ? 'h5' : 'h4'}
                                    sx={{
                                        width: '90%',
                                        color: '#593030'
                                    }}
                                >
                                    No favorites found in your secret hideout. Unlock the magic by adding your cherished anime and manga favorites!
                                </Typography>
                            }
                        </Stack>
                    </Box>
                </>
            )}
        </>
    )
}


export default FavoritesPage;