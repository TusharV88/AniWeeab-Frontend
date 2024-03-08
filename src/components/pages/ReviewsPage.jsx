import { Box, IconButton, Stack, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material"
import { DeleteOutlineRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import MediaTitleBar from "../common/MediaTitleBar";
import { useLazyReviewByUserQuery, useReviewDeleteMutation } from "../../redux/services/review";
import { useDispatch, useSelector } from "react-redux";
import { decUserReview, incUserReview } from "../../redux/slices/userReviewLimit";
import { toast } from "react-toastify";
import { initUserReview, resetUserReview } from "../../redux/slices/userReviewSlice";
import { getToken } from "../../utils/userToken";
import AniLoader from "../common/AniLoader";
import { stopLoading } from "../../redux/slices/aniLoaderSlice";

const ReviewsPage = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const token = getToken();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const [slides, setSlides] = useState([]);
    const [revItemID, setRevItemID] = useState(null);

    const slidesLength = Array.isArray(slides) ? slides.length : 0;

    const [reviewDelete, { data, error, isSuccess }] = useReviewDeleteMutation();
    const [reviewTrigger, { isSuccess: revIsSuccess }] = useLazyReviewByUserQuery();

    const userReviewsData = useSelector((state) => state.userReviews);
    const userReviewsLimit = useSelector((state) => state.userReviewsLimit);

    const userReviewsStateLength = Array.isArray(userReviewsData) && userReviewsData.length > 0 ? userReviewsData[0].length : 0;


    function reviewDeleteHandler(id) {
        setRevItemID(id);
        dispatch(decUserReview());
        reviewDelete({ token, id });
    }


    useEffect(() => {
        if (slidesLength === 0 || (isSuccess && data)) {
            if (userReviewsLimit === 0) {
                dispatch(incUserReview());
                reviewTrigger(token)
                    .unwrap()
                    .then((fulfilled) => {
                        if (fulfilled !== undefined) {
                            dispatch(resetUserReview());
                            dispatch(initUserReview(fulfilled.userReviews));
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
                <p
                    style={{
                        color: '#593030',
                        fontWeight: 700
                    }}
                >
                    Review: <span style={{ color: '#ff3838' }}>Removed Successfully!!</span>
                </p>
                , { position: 'bottom-left' });
        } else if (error) {
            toast.error(error.data.msg, { position: 'bottom-left' });
        }
    }, [data, error]);


    useEffect(() => {
        if (revIsSuccess) {
            if (userReviewsStateLength > 0 || userReviewsStateLength === 0) {
                setSlides(userReviewsData[0]);
                if (slidesLength > 0 || slidesLength === 0) {
                    setIsLoading(false);
                    dispatch(stopLoading());
                }
            }
        }
    }, [revIsSuccess, userReviewsStateLength, slidesLength]);


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
                            <MediaTitleBar heading={'Reviews'} slides={slides} />

                            {slides.length > 0 ? (
                                <Stack spacing={3} width='95%'>
                                    {slides.map(item => (
                                        <Box
                                            key={item._id}
                                            sx={{
                                                position: "relative",
                                                border: '2px solid #ff3838',
                                                borderRadius: '5px',
                                                display: "flex",
                                                flexDirection: { xs: "column", md: "row" },
                                                padding: 1,
                                                transition: 'all .3s ease !important',
                                                "&:hover": {
                                                    boxShadow: '0 8px 16px #ff968a !important',
                                                }
                                            }}>
                                            <Box
                                                sx={{ width: { xs: 0, md: "10%" } }}
                                                component={Link}
                                                to={`/${item.mediaType}/${item.mediaID}`}
                                            >
                                                <Box sx={{
                                                    paddingTop: "160%",
                                                    backgroundImage: `url(${item.mediaImage})`,
                                                    backgroundPosition: 'center',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: 'cover',
                                                    borderRadius: "8px",
                                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2) ',
                                                    transition: 'all .3s ease !important',
                                                    "&:hover": {
                                                        transform: 'translateY(-4px)',
                                                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)'
                                                    }
                                                }}
                                                />
                                            </Box>

                                            <Box
                                                sx={{
                                                    textDecoration: 'none',
                                                    width: { xs: "100%", md: "80%" },
                                                    padding: { xs: 0, md: "0 2rem" }
                                                }}
                                                component={Link}
                                                to={`/${item.mediaType}/${item.mediaID}`}
                                            >
                                                <Stack spacing={1}>
                                                    <Typography
                                                        variant="h6"
                                                        fontWeight="700"
                                                        color="#ff3838"
                                                    >
                                                        {item.mediaTitle}
                                                    </Typography>
                                                    {item.mediaTitleEnglish !== 'none' ?
                                                        <Typography
                                                            variant="body2"
                                                            marginTop='0px !important'
                                                            color="#593030"
                                                        >
                                                            {item.mediaTitleEnglish}
                                                        </Typography> : null}
                                                    <Typography variant="caption" color="text.secondary">
                                                        {item.createdAt}
                                                    </Typography>
                                                    <Typography
                                                        color='#593030'
                                                        whiteSpace='pre-wrap'
                                                    >
                                                        {item.content}
                                                    </Typography>
                                                </Stack>
                                            </Box>

                                            <IconButton
                                                onClick={() => { reviewDeleteHandler(item._id) }}
                                                sx={{
                                                    width: isSmallScreen ? '100%' : '40px',
                                                    height: '40px',
                                                    color: isSmallScreen ? '#fdfcfa' : '#ff3838',
                                                    borderRadius: '5px',
                                                    backgroundColor: isSmallScreen ? '#ff3838 !important' : '#fdfcfa !important',
                                                    position: { xs: 'relative', md: 'absolute' },
                                                    right: { xs: 0, md: '10px' },
                                                    marginTop: { xs: 2, md: 0 },
                                                    transition: 'all .3s ease !important',
                                                    "&:hover": {
                                                        backgroundColor: revItemID === item._id ? '' : '#ff3838 !important',
                                                        color: revItemID === item._id ? '' : '#fdfcfa !important',
                                                        boxShadow: '0px 4px 6px rgba(89, 48, 48, 0.1), 0px 2px 4px rgba(89, 48, 48, 0.06) !important'
                                                    }
                                                }}
                                                disabled={revItemID === item._id ? true : false}
                                            >
                                                {revItemID === item._id ?
                                                    <LoadingButton
                                                        className={isSmallScreen ? "removeLoadBtn" : "iconLoadBtn"}
                                                        loading
                                                        disabled />
                                                    :
                                                    <DeleteOutlineRounded />}

                                                {revItemID === item._id ? null : isSmallScreen ? <Typography variant="h6">Remove</Typography> : null}
                                            </IconButton>
                                        </Box>
                                    ))}
                                </Stack>
                            ) : (
                                <Typography
                                    textAlign='center'
                                    variant={isSmallScreen ? 'h5' : 'h4'}
                                    sx={{
                                        width: '90%',
                                        color: '#593030'
                                    }}
                                >
                                    Oh no! It seems like your review corner is a bit empty. Don't be shy - share your anime and manga experiences with the world! Your insights could be the spark that ignites someone else's interest. Let's turn this blank canvas into a masterpiece of opinions!
                                </Typography>
                            )}
                        </Stack>
                    </Box>
                </>
            )}
        </>
    )
}

export default ReviewsPage;