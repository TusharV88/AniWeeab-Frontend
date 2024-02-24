import { useEffect, useRef, useState } from "react";
import { Avatar, Box, Chip, Grid, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import { DeleteOutlineRounded, DeleteRounded, FavoriteRounded, SendRounded } from "@mui/icons-material";
import CircularRate from "../common/CircularRate";
import VanillaTilt from 'vanilla-tilt';
import '../../style/DetailPage.css';
import { LoadingButton } from "@mui/lab";
import { detailConfig } from "../../utils/detailConfig";
import MediaGridData from "../common/MediaGridData";
import DetailStacked from "../common/DetailStacked";
import MediaTitleBar from "../common/MediaTitleBar";
import MediaItem from "../common/MediaItem";
import MediaThemeGrid from "../common/MediaThemeGrid";
import { useDispatch, useSelector } from "react-redux";
import { incMediaDetail } from "../../redux/slices/MediaDetail/mediaDetailLimit";
import { initMediaDetail } from "../../redux/slices/MediaDetail/mediaDetailSlice";
import { toast } from 'react-toastify';
import { getToken } from '../../utils/userToken.js';
import { useParams } from "react-router-dom";
import { initMediaCharactersDetail } from "../../redux/slices/MediaDetail/mediaCharactersDetailSlice.js";
import { useLazyMediaDetailQuery } from "../../redux/services/mediaDetail.js";
import { initRecommendation } from "../../redux/slices/MediaDetail/recommendationSlice.js";
import { useFavoriteAddMutation, useFavoriteDeleteMutation, useLazyFavoriteByUserQuery } from "../../redux/services/favorite.js";
import { initUserFavorite, resetUserFavorite } from "../../redux/slices/userFavoriteSlice.js";
import { decUserFavorite, incUserFavorite } from "../../redux/slices/userFavoriteLimit.js";
import { useLazyReviewByMediaQuery, useReviewAddMutation, useReviewDeleteMutation } from "../../redux/services/review.js";
import { decUserReview, incUserReview } from "../../redux/slices/userReviewLimit.js";
import { initUserReview, resetUserReview } from "../../redux/slices/userReviewSlice.js";
import stringAvatar from '../../utils/stringToChar.js';
import AniLoader from "../common/AniLoader.jsx";
import { startLoading, stopLoading } from "../../redux/slices/aniLoaderSlice.js";


const DetailPage = () => {
    const tiltRef = useRef();
    const dispatch = useDispatch();
    const token = getToken();
    const user = useSelector((state) => state.user);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const { category, id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isAnime, setIsAnime] = useState(false);

    const [item, setItem] = useState({});
    const [characters, setCharacters] = useState({});
    const [slides, setSlides] = useState([]);

    const [favID, setFavID] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favLoading, setFavLoading] = useState(false);


    const [reviews, setReviews] = useState([]);
    const [revPostLoading, setRevPostLoading] = useState(false);
    const [reviewID, setReviewID] = useState(null);
    const [reviewField, setReviewField] = useState('');



    const itemLength = Object.keys(item).length;
    const charactersLength = Object.keys(characters).length;
    const slidesLength = Array.isArray(slides) ? slides.length : 0;
    const reviewsLength = Array.isArray(reviews) ? reviews.length : 0;

    // Media
    const [mediaDetailTrigger] = useLazyMediaDetailQuery();

    const mediaDetailData = useSelector((state) => state.mediaDetail);
    const mediaCharactersDetailData = useSelector((state) => state.mediaCharactersDetail);
    const recommendationsData = useSelector((state) => state.recommendations);
    const mediaDetailLimit = useSelector((state) => state.mediaDetailLimit);

    const mediaDetailStateLength = mediaDetailData.length;
    const mediaCharactersDetailStateLength = mediaCharactersDetailData.length;
    const recommendationStateLength = recommendationsData.length;

    // Favorites
    const [favoriteTrigger] = useLazyFavoriteByUserQuery();
    const [favoriteAdd, { data: favAddData, error: favAddError, isSuccess: favAddSuccess }] = useFavoriteAddMutation();
    const [favoriteDelete, { data: favDelData, error: favDelError, isSuccess: favDelSuccess }] = useFavoriteDeleteMutation();

    const userFavoritesData = useSelector((state) => state.userFavorites);
    const userFavoritesLimit = useSelector((state) => state.userFavoritesLimit);
    const userFavoritesStateLength = Array.isArray(userFavoritesData) && userFavoritesData.length > 0
        ? userFavoritesData[0].length : 0;

    // Reviews
    const [reviewTrigger] = useLazyReviewByMediaQuery();
    const [reviewAdd, { data: revAddData, error: revAddError, isSuccess: revAddSuccess }] = useReviewAddMutation();
    const [reviewDelete, { data: revDelData, error: revDelError, isSuccess: revDelSuccess }] = useReviewDeleteMutation();

    const userReviewsData = useSelector((state) => state.userReviews);
    const userReviewsLimit = useSelector((state) => state.userReviewsLimit);
    const userReviewsStateLength = Array.isArray(userReviewsData) && userReviewsData.length > 0
        ? userReviewsData[0].length : 0;



    useEffect(() => {
        dispatch(startLoading());

        if (category === 'anime') {
            setIsAnime(true);
        }
    }, []);

    // ------------------------- Favorites --------------------------- \\
    const favoriteHandler = () => {
        setFavLoading(true);

        if (isFavorite) {
            const data = {
                token,
                mediaID: favID,
            };

            favoriteDelete(data);
        } else {
            const data = {
                token,
                mediaID: mediaDetailData[0].mal_id,
                mediaType: category,
                mediaImage: mediaDetailData[0].images.jpg.large_image_url,
                mediaTitle: mediaDetailData[0].title,
                mediaTitleEnglish: mediaDetailData[0].title_english ? mediaDetailData[0].title_english : 'none',
            };

            favoriteAdd(data);
        }
    };



    useEffect(() => {
        if ((itemLength === 0 && slidesLength === 0 && charactersLength === 0) || ((favAddSuccess && favAddData) || (favDelSuccess && favDelData))) {
            if (userFavoritesLimit === 0) {
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
    }, [favAddData, favDelData, favAddSuccess, favDelSuccess, userFavoritesLimit, dispatch]);



    useEffect(() => {
        if (favAddData) {
            dispatch(decUserFavorite());
            toast.success(
                <div>
                    <p style={{ color: '#593030', fontWeight: 700 }}>{favAddData.msg}</p>
                    <p style={{ color: '#ff3838', fontWeight: 700 }}>{favAddData.title}</p>
                </div>
                , { position: 'bottom-left' });
        } else if (favAddError) {
            toast.error(favAddError.data.msg, { position: 'bottom-left' });
        }
    }, [favAddData, favAddError]);


    useEffect(() => {
        if (favDelData) {
            dispatch(decUserFavorite());
            toast.success(
                <div>
                    <p style={{ color: '#593030', fontWeight: 700 }}>{favDelData.msg}</p>
                    <p style={{ color: '#ff3838', fontWeight: 700 }}>{favDelData.title}</p>
                </div>
                , { position: 'bottom-left' });
        } else if (favDelError) {
            toast.error(favDelError.data.msg, { position: 'bottom-left' });
        }
    }, [favDelData, favDelError]);


    // -------------- Check User Favorite Exists or Not
    useEffect(() => {
        if (mediaDetailStateLength > 0 && userFavoritesStateLength > 0) {
            for (let i = 0; i < userFavoritesStateLength; i++) {
                if (Number(userFavoritesData[0][i].mediaID) === mediaDetailData[0].mal_id) {
                    setFavID(userFavoritesData[0][i]._id);
                    setIsFavorite(true);
                    break;
                } else {
                    setFavID(null);
                    setIsFavorite(false);
                }
            }
            setFavLoading(false);
        } else {
            setFavID(null);
            setIsFavorite(false);
            setFavLoading(false);
        }
    }, [mediaDetailStateLength, userFavoritesStateLength]);



    // ----------------------------- Reviews --------------------------- \\
    const reviewChangeHandler = event => {
        event.preventDefault();
        const { name, value } = event.target;

        setReviewField(value);
    }

    const reviewHandler = (id) => {
        if (id) {
            reviewDelete({ token, id });
            setReviewID(id);
        } else {
            if (!(reviewField.trim() === '')) {
                const data = {
                    token,
                    content: reviewField,
                    mediaID: mediaDetailData[0].mal_id,
                    mediaType: category,
                    mediaImage: mediaDetailData[0].images.jpg.large_image_url,
                    mediaTitle: mediaDetailData[0].title,
                    mediaTitleEnglish: mediaDetailData[0].title_english ? mediaDetailData[0].title_english : 'none',
                };
                reviewAdd(data);
                setRevPostLoading(true);
            }
        }
    };


    useEffect(() => {
        if (mediaDetailStateLength > 0 || ((revAddSuccess && revAddData) || (revDelSuccess && revDelData))) {
            if (userReviewsLimit === 0) {
                const data = {
                    token,
                    mediaID: mediaDetailData[0].mal_id
                }
                dispatch(incUserReview());
                reviewTrigger(data)
                    .unwrap()
                    .then((fulfilled) => {
                        if (fulfilled !== undefined) {
                            dispatch(resetUserReview());
                            dispatch(initUserReview(fulfilled.mediaReviews));
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
    }, [revAddData, revDelData, revAddSuccess, revDelSuccess, mediaDetailStateLength, userReviewsLimit, dispatch]);


    useEffect(() => {
        if (revAddData) {
            dispatch(decUserReview());
            toast.success(
                <p
                    style={{
                        color: '#593030',
                        fontWeight: 700
                    }}
                >
                    Review: <span style={{ color: '#ff3838' }}>Added Successfully!!</span>
                </p>
                , { position: 'bottom-left' });
            setReviewField('');
            setRevPostLoading(false);
        } else if (revAddError) {
            toast.error(revAddError.data.msg, { position: 'bottom-left' });
        }
    }, [revAddData, revAddError]);



    useEffect(() => {
        if (revDelData) {
            dispatch(decUserReview());
            toast.success(
                <p
                    style={{
                        color: '#593030',
                        fontWeight: 700
                    }}
                >
                    Review: <span style={{ color: '#ff3838' }}>Removed Successfully!!</span>
                </p>
                , { position: 'bottom-left' });
        } else if (revDelError) {
            toast.error(revDelError.data.msg, { position: 'bottom-left' });
        }
    }, [revDelData, revDelError]);


    // --------------------- Media ---------------------- \\
    useEffect(() => {
        if (mediaDetailLimit === 0) {
            dispatch(incMediaDetail());
            mediaDetailTrigger({ token, category, id })
                .unwrap()
                .then((fulfilled) => {
                    if (fulfilled !== undefined) {
                        dispatch(initMediaDetail(fulfilled.detailData));
                        dispatch(initMediaCharactersDetail(fulfilled.charactersData));
                        dispatch(initRecommendation(fulfilled.recommendationData));
                    }
                })
                .catch((rejected) => {
                    toast.error(
                        <div>
                            <p>Status Code: {rejected.data.statusCode}</p>
                            <p>Error: {rejected.data.msg}</p>
                        </div>
                        , { position: 'bottom-left' });
                })
        }
    }, []);


    useEffect(() => {
        if (mediaDetailStateLength > 0 && (mediaCharactersDetailStateLength > 0 || mediaCharactersDetailStateLength === 0) && (recommendationStateLength > 0 || recommendationStateLength === 0)) {
            setItem(mediaDetailData[0]);
            setCharacters(mediaCharactersDetailData[0]);
            setSlides(recommendationsData[0]);

            if (itemLength > 0 && (charactersLength > 0 || charactersLength === 0) && (slidesLength > 0 || slidesLength === 0) && (userReviewsStateLength > 0 || userReviewsStateLength === 0)) {
                setReviews(userReviewsData[0]);
                if (reviewsLength > 0 || reviewsLength === 0) {
                    setIsLoading(false);
                    dispatch(stopLoading());
                }
            }
        }
    }, [mediaDetailStateLength, mediaCharactersDetailStateLength, recommendationStateLength, itemLength, charactersLength, slidesLength, userReviewsStateLength, reviewsLength]);



    useEffect(() => {
        if (mediaDetailStateLength > 0 && mediaCharactersDetailStateLength > 0 && recommendationStateLength > 0 && !isLoading) {
            if (itemLength > 0 && (userReviewsStateLength > 0 || userReviewsStateLength === 0)) {
                if (reviewsLength > 0 || reviewsLength === 0) {
                    VanillaTilt.init(tiltRef.current, {
                        max: 25,
                        speed: 400,
                        glare: true,
                        'max-glare': 0.5,
                    });
                }
            }
        }
    }, [mediaDetailStateLength, mediaCharactersDetailStateLength, recommendationStateLength, userReviewsStateLength, reviewsLength, isLoading]);


    return (
        <>
            {isLoading ? (
                <AniLoader />
            ) : (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            padding: '80px 0',
                            backgroundImage: `url(${item.images.jpg.large_image_url})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            '&:before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.804), transparent), linear-gradient(to bottom, rgba(0, 0, 0, 0.804), transparent)',
                                zIndex: 1,
                                backdropFilter: 'blur(10px)'
                            },
                        }}
                    >

                        <Stack
                            spacing={5}
                            direction={isSmallScreen ? 'column-reverse' : 'row'}
                            zIndex={2}
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: isSmallScreen ? 'space-around' : 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Stack
                                spacing={3}
                                sx={{
                                    width: isSmallScreen ? '90%' : '55%',
                                    height: isSmallScreen ? '' : '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Stack
                                    spacing={4}
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'start',
                                    }}
                                >

                                    <Stack spacing={1}>
                                        <Typography
                                            variant="h3"
                                            fontWeight={600}
                                            sx={{
                                                paddingBottom: '2px',
                                                color: '#ff3838',
                                                display: '-webkit-box',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 2,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                fontSize: {
                                                    xs: '1.5rem',
                                                    sm: '2rem',
                                                    md: '2.3rem',
                                                    lg: '3rem',
                                                    xl: '3.5rem',
                                                },
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                        {item.title_english ?
                                            (
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        color: 'white',
                                                        display: '-webkit-box',
                                                        WebkitBoxOrient: 'vertical',
                                                        WebkitLineClamp: 2,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        fontSize: {
                                                            xs: '1rem',
                                                            sm: '1.2rem',
                                                            md: '1.4rem',
                                                            lg: '1.6rem',
                                                            xl: '1.8rem',
                                                        },
                                                    }}
                                                >{item.title_english}</Typography>
                                            ) : null}
                                    </Stack>

                                    {item.genres ?
                                        (
                                            <Stack
                                                useFlexGap
                                                flexWrap="wrap"
                                                direction='row'
                                                spacing={2}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                {item.score ? (
                                                    <CircularRate value={item.score} rateSize={isSmallScreen ? 40 : 50} />
                                                ) : null}

                                                {item.genres.map((genre, index) => {
                                                    if (index <= 1) {
                                                        return (
                                                            <Chip
                                                                key={genre.mal_id}
                                                                size={isSmallScreen ? 'small' : 'medium'}
                                                                sx={{
                                                                    bgcolor: '#ff3838',
                                                                    color: 'white',
                                                                    borderRadius: '5px',
                                                                }}
                                                                label={genre.name}
                                                            />
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </Stack>
                                        ) : null}

                                    {item.synopsis ?
                                        (
                                            <Typography
                                                textAlign='start'
                                                variant='body1'
                                                sx={{
                                                    color: 'white',
                                                    display: '-webkit-box',
                                                    WebkitBoxOrient: 'vertical',
                                                    WebkitLineClamp: 3,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    lineHeight: '25px'
                                                }}
                                            >{item.synopsis}</Typography>
                                        ) : null}
                                </Stack>

                                <LoadingButton
                                    loading={favLoading}
                                    loadingPosition="center"
                                    disabled={favLoading}
                                    startIcon={isFavorite ? <DeleteRounded sx={{ visibility: favLoading ? 'hidden' : 'visible' }} /> : <FavoriteRounded sx={{ visibility: favLoading ? 'hidden' : 'visible' }} />}
                                    className={favLoading ? "detailFavLoadBtn" : "detailFavBtn"}
                                    onClick={favoriteHandler}
                                    size={isExtraSmallScreen ? "small" : "medium"}
                                    sx={{
                                        fontWeight: '700'
                                    }}
                                >
                                    {isFavorite ?
                                        <span className={favLoading ? "disSpan" : ""}>Remove From Favorite</span>
                                        :
                                        <span className={favLoading ? "disSpan" : ""}>Add To Favorite</span>
                                    }
                                </LoadingButton>
                            </Stack>


                            <Box
                                ref={isSmallScreen || isExtraSmallScreen ? null : tiltRef}
                                className={isSmallScreen || isExtraSmallScreen ? "" : "detailImgHeader"}
                                sx={{
                                    width: isExtraSmallScreen ? '200px' : isSmallScreen ? '250px' : '300px',
                                    height: isExtraSmallScreen ? '280px' : isSmallScreen ? '350px' : '480px',
                                    overflow: 'hidden !important',
                                    borderRadius: '20px',
                                    backgroundImage: `url(${item.images.jpg.large_image_url})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                }}
                            />
                        </Stack>
                    </Box>


                    <DetailStacked heading={"Titles"} item={item} state={"title"} />


                    {isAnime && item.trailer && item.trailer.embed_url ?
                        <Stack spacing={3} marginTop='100px'>
                            <MediaTitleBar heading={'Trailer'} />

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    aspectRatio: '16/9',
                                    overflow: 'hidden',
                                    maxWidth: '100%',
                                }}
                            >
                                <iframe
                                    width="95%"
                                    height="100%"
                                    src={item.trailer.embed_url.replace('autoplay=1', 'autoplay=0')}
                                    frameBorder="0"
                                    allowFullScreen
                                    title="Trailer"
                                    className="trailer"
                                />
                            </Box>
                        </Stack>
                        : null
                    }


                    <MediaGridData
                        heading={'Information'}
                        item={item}
                        data={isAnime ? detailConfig.animeInfoData : detailConfig.mangaInfoData}
                    />

                    <MediaGridData
                        heading={'Statistics'}
                        item={item}
                        data={detailConfig.statsData}
                    />

                    <DetailStacked heading={"Synopsis"} item={item} state={"synopsis"} />

                    <DetailStacked heading={"Background"} item={item} state={"background"} />

                    {characters.length > 0 ?
                        <Stack spacing={3}
                            sx={{
                                marginTop: '80px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <MediaTitleBar heading={isAnime ? 'Characters & Voice Actors' : 'Characters'} />

                            <Grid container sx={{ width: '95%', border: '2px solid #ff3838', borderRadius: '5px' }}>
                                {characters.map(charActor => (
                                    <Grid
                                        key={charActor.character.mal_id}
                                        item
                                        xs={12}
                                        sm={12}
                                        md={isAnime ? 6 : 4}
                                        sx={{
                                            padding: isExtraSmallScreen ? '10px' : '20px',
                                            borderRight: isSmallScreen ? '' : '1px solid #ff3838',
                                            borderBottom: '1px solid #ff3838'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Stack spacing={2} direction='row' width={isAnime ? '50%' : '100%'}>
                                                <Box>
                                                    <img
                                                        src={`${charActor.character.images.jpg.image_url}`}
                                                        alt={`${charActor.character.name} Image`}
                                                        width={isExtraSmallScreen ? '60px' : '80px'}
                                                        height={isExtraSmallScreen ? '100px' : '120px'}
                                                        style={{
                                                            objectFit: 'cover',
                                                            objectPosition: 'center',
                                                            borderRadius: '5px'
                                                        }}
                                                    />
                                                </Box>
                                                <Stack spacing={1}>
                                                    <Typography
                                                        variant={isExtraSmallScreen ? "body1" : "h6"}
                                                        color='#ff3838'
                                                        textAlign='start'
                                                    >
                                                        {charActor.character.name}
                                                    </Typography>
                                                    <Typography
                                                        variant={isExtraSmallScreen ? "body2" : "body1"}
                                                        color='#593030'
                                                        textAlign='start'
                                                    >
                                                        {charActor.role}
                                                    </Typography>
                                                </Stack>
                                            </Stack>

                                            {isAnime ?
                                                <Stack spacing={2} direction='row-reverse' width='50%'>
                                                    <Box>
                                                        <img
                                                            src={`${charActor.voice_actors.length > 0 ? charActor.voice_actors[0].person.images.jpg.image_url : 'https://cdn.myanimelist.net/images/questionmark_23.gif?s=f7dcbc4a4603d18356d3dfef8abd655c'}`}
                                                            alt={`${charActor.voice_actors.length > 0 ? charActor.voice_actors[0].person.name : 'Unknown'} Image`}
                                                            width={isExtraSmallScreen ? '60px' : '80px'}
                                                            height={isExtraSmallScreen ? '100px' : '120px'}
                                                            style={{
                                                                objectFit: 'cover',
                                                                objectPosition: 'center',
                                                                borderRadius: '5px'
                                                            }}
                                                        />
                                                    </Box>
                                                    <Stack spacing={1}>
                                                        <Typography
                                                            variant={isExtraSmallScreen ? "body1" : "h6"}
                                                            color='#ff3838'
                                                            textAlign='end'
                                                        >
                                                            {charActor.voice_actors.length > 0 ? charActor.voice_actors[0].person.name : 'Unknown'}
                                                        </Typography>
                                                        <Typography
                                                            variant={isExtraSmallScreen ? "body2" : "body1"}
                                                            color='#593030'
                                                            textAlign='end'
                                                        >
                                                            {charActor.voice_actors.length > 0 ? charActor.voice_actors[0].language : 'Unknown'}
                                                        </Typography>
                                                    </Stack>
                                                </Stack> : null}
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Stack> : null}


                    {isAnime ?
                        item.theme || (item.theme.openings.length === 0 && item.theme.endings.length === 0) ?

                            <Stack spacing={3}
                                sx={{
                                    marginTop: '80px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <MediaTitleBar heading={'Theme'} />


                                <Stack
                                    spacing={2}
                                    direction={isSmallScreen ? 'column' : 'row'}
                                    sx={{
                                        padding: isSmallScreen ? '' : '0 10px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: isSmallScreen ? 'center' : ''
                                    }}
                                >
                                    <MediaThemeGrid heading={'Opening Themes'} data={item.theme.openings} />

                                    <MediaThemeGrid heading={'Ending Themes'} data={item.theme.endings} />
                                </Stack>
                            </Stack>
                            : null
                        : null
                    }


                    <Stack spacing={4} margin='80px 0'>
                        <MediaTitleBar heading={'Reviews'} slides={reviews} />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Stack spacing={3} width='95%'>
                                <Stack spacing={2} direction='row' alignItems='center'>
                                    <Avatar
                                        alt={user.name}
                                        sx={{
                                            width: isExtraSmallScreen ? "40px" : "45px",
                                            height: isExtraSmallScreen ? "40px" : "45px",
                                            fontWeight: '700',
                                            fontSize: isExtraSmallScreen ? 'medium' : 'large',
                                            color: '#f3f3f3',
                                            bgcolor: '#ff3838'
                                        }}
                                    >
                                        {stringAvatar(user.name)}
                                    </Avatar>

                                    <Typography
                                        variant={isExtraSmallScreen ? "body1" : "h6"}
                                        fontWeight='700'
                                        color='#593030'
                                    >
                                        {user.name}
                                    </Typography>
                                </Stack>

                                <TextField
                                    id="reviewField"
                                    label='Review'
                                    name="review"
                                    multiline
                                    value={reviewField}
                                    onChange={reviewChangeHandler}
                                    className="formInput"
                                    InputLabelProps={{ className: 'textfield__label' }}
                                    placeholder={isExtraSmallScreen ? "Share your impressions here..." : "Unleash your otaku wisdom! Share your impressions here..."}
                                    fullWidth
                                />

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'end',
                                        alignItems: 'center',
                                    }}
                                >
                                    <LoadingButton
                                        loading={revPostLoading}
                                        loadingPosition="center"
                                        disabled={revPostLoading}
                                        startIcon={<SendRounded sx={{ visibility: revPostLoading ? "hidden" : "visible" }} />}
                                        className={revPostLoading ? "detailReviewLoadBtn" : "detailReviewBtn"}
                                        onClick={() => { reviewHandler(null) }}
                                        size={isExtraSmallScreen ? "small" : "medium"}
                                        sx={{
                                            fontWeight: '700'
                                        }}
                                    >
                                        <span className={revPostLoading ? "disSpan" : ""}>Post</span>
                                    </LoadingButton>
                                </Box>
                            </Stack>
                        </Box>


                        {reviewsLength > 0 ? reviews.map(userReview => (
                            console.log("UserReview: ", userReview),
                            <Box
                                key={userReview._id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'column'
                                }}
                            >
                                <Box sx={{ height: '2px', bgcolor: '#ff3838', width: '95%', marginBottom: '20px', borderRadius: '5px' }} />

                                <Box
                                    sx={{
                                        width: '95%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: '10px 0',
                                    }}
                                >
                                    <Stack spacing={3} width='100%'>
                                        <Stack spacing={2} direction='row' alignItems='center'>
                                            <Avatar
                                                alt={userReview.username}
                                                src={stringAvatar(userReview.username)}
                                                sx={{
                                                    width: isExtraSmallScreen ? "40px" : "45px",
                                                    height: isExtraSmallScreen ? "40px" : "45px",
                                                    fontWeight: '700',
                                                    fontSize: isExtraSmallScreen ? 'medium' : 'large',
                                                    bgcolor: '#ff3838'
                                                }}
                                            >
                                                {stringAvatar(userReview.username)}
                                            </Avatar>

                                            <Stack>
                                                <Typography
                                                    variant={isExtraSmallScreen ? "body1" : "h6"}
                                                    fontWeight='700'
                                                    color='#593030'
                                                >
                                                    {userReview.username}
                                                </Typography>

                                                <Typography
                                                    variant={isExtraSmallScreen ? "caption" : "body2"}
                                                    color='#666666'
                                                >
                                                    {userReview.createdAt}
                                                </Typography>
                                            </Stack>
                                        </Stack>

                                        <Typography
                                            variant={isExtraSmallScreen ? "body2" : "body1"}
                                            fontWeight='700'
                                            color='#593030'
                                            textAlign='justify'
                                            className="reviewStyler"
                                            width="100%"
                                            whiteSpace='pre-wrap'
                                        >
                                            {userReview.content}
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'end',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {userReview.user === user._id ?
                                                <LoadingButton
                                                    loading={reviewID === userReview._id}
                                                    loadingPosition="center"
                                                    disabled={reviewID === userReview._id}
                                                    startIcon={<DeleteOutlineRounded sx={{ visibility: reviewID === userReview._id ? "hidden" : "visible" }} />}
                                                    className={reviewID === userReview._id ? "detailReviewLoadBtn" : "detailReviewBtn"}
                                                    onClick={() => { reviewHandler(userReview._id) }}
                                                    size={isExtraSmallScreen ? "small" : "medium"}
                                                    sx={{
                                                        fontWeight: '700'
                                                    }}
                                                >
                                                    <span className={reviewID === userReview._id ? "disSpan" : ""}>Remove</span>
                                                </LoadingButton> : null
                                            }
                                        </Box>
                                    </Stack>
                                </Box >
                            </Box>
                        )) : null
                        }
                    </Stack >


                    {
                        slides.length > 0 ?
                            <MediaItem slides={slides} heading={'You may also like'} isRecommend={true} />
                            : null
                    }
                </>
            )}
        </>
    )
}


export default DetailPage;