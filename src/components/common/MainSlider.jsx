import { useRef } from "react";
import { Link } from "react-router-dom";
import Navigators from "./Navigators";
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import CircularRate from "../common/CircularRate";
import { Box, Button, Chip, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ArrowBackIosNewRounded, ArrowForwardIosRounded, Info } from "@mui/icons-material";
import '../../style/MediaSlider.css';
import "../../../node_modules/swiper/swiper-bundle.min.css";
import "../../../node_modules/swiper/modules/effect-fade.min.css";


SwiperCore.use([Autoplay]);

const MainSlider = ({ slides }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const swiperRef = useRef(null);

    const navigatorConfig = {
        label: 'MainSlider',
        position: 'column',
        class: 'iconBtn',
        iconBtn1: <ArrowForwardIosRounded sx={{ color: '#eaddd1' }} />,
        iconBtn2: <ArrowBackIosNewRounded sx={{ color: '#eaddd1' }} />,
    }

    return (
        <Box sx={{ position: 'relative' }}>
            <Swiper
                className="slider"
                slidesPerView={1}
                loop={true}
                direction={isSmallScreen ? 'vertical' : 'horizontal'}
                speed={isExtraSmallScreen ? 850 : 1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                {...(isExtraSmallScreen
                    ? {}
                    : {
                        ref: swiperRef,
                    })}
            >
                {slides.map(item => (
                    <SwiperSlide key={item.mal_id}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                height: '100%',
                                backgroundImage: `url(${item.images.jpg.large_image_url})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
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
                                    backdropFilter: isSmallScreen ? 'blur(1px)' : 'blur(5px)'
                                },
                            }}
                        >
                            <Box
                                width={isSmallScreen ? '100%' : '50%'}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    height: '100%',
                                    zIndex: 1
                                }}
                            >
                                <Stack
                                    spacing={isSmallScreen ? 3 : 4}
                                    width='80%'
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        alignItems: 'start',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Stack spacing={1}>
                                        <Typography
                                            variant="h3"
                                            fontWeight={600}
                                            sx={{
                                                paddingBottom: '2px',
                                                color: 'white',
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
                                                    <CircularRate value={item.score} rateSize={50} />
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
                                                variant={isSmallScreen ? 'body2' : 'body1'}
                                                sx={{
                                                    color: 'white',
                                                    display: '-webkit-box',
                                                    WebkitBoxOrient: 'vertical',
                                                    WebkitLineClamp: isSmallScreen ? 2 : 3,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    lineHeight: '25px'
                                                }}
                                            >{item.synopsis}</Typography>
                                        ) : null}

                                    <Button
                                        className="btn"
                                        startIcon={<Info />}
                                        variant="contained"
                                        sx={{
                                            bgcolor: "#ff3838",
                                        }}
                                        LinkComponent={Link}
                                        to={`/${item.url.toLowerCase().includes('/anime/') ? 'anime' : 'manga'}/${item.mal_id}`}
                                    >
                                        More Info
                                    </Button>
                                </Stack>
                            </Box>
                            {isSmallScreen ? null : (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '50%',
                                        height: '100%',
                                        position: 'relative',
                                        zIndex: 1
                                    }}
                                >
                                    <Box
                                        border='20px solid #eaddd1'
                                        sx={{
                                            width: '50%',
                                            height: '100%',
                                            backgroundImage: `url(${item.images.jpg.large_image_url})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            transform: 'rotateZ(15deg)'
                                        }}
                                    />
                                </Box>
                            )}
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
            {isSmallScreen ? null : (
                <Navigators config={navigatorConfig} swiperRef={swiperRef} />
            )}
        </Box>
    );
};

export default MainSlider;