import { useRef, useState, useEffect } from "react";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import Navigators from "./Navigators";
import { ArrowBackIosNewRounded, ArrowForwardIosRounded } from "@mui/icons-material";
import { Swiper, SwiperSlide } from 'swiper/react';
import ItemContent from "./ItemContent";


const MediaItem = ({ slides, heading, isRecommend = false }) => {
    const navigatorConfig = {
        label: 'MediaItem',
        position: 'row',
        class: 'navBtn',
        iconBtn1: <ArrowBackIosNewRounded fontSize="small" sx={{ color: '#eaddd1' }} />,
        iconBtn2: <ArrowForwardIosRounded fontSize="small" sx={{ color: '#eaddd1' }} />,
    }

    const swiperRef = useRef(null);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [slideBtnConfig, setSlideBtnConfig] = useState({
        activeIndex: 0,
        lastSlideIndex: 0,
    });

    const slidesPerSize = isSmallScreen ? 2 : isMediumScreen ? 3 : 5;
    const spacePerSize = 10;


    function SlideIndexHandler() {
        setSlideBtnConfig(prevState => ({
            ...prevState,
            activeIndex: swiperRef.current.swiper.activeIndex,
        }));
    }


    useEffect(() => {
        setSlideBtnConfig(prevState => ({
            ...prevState,
            lastSlideIndex: slides.length - slidesPerSize,
        }));
    }, [slideBtnConfig.activeIndex, slidesPerSize])


    return (
        <Box
            sx={{
                margin: '100px 0',
                padding: '0 10px',
            }}
        >
            <Stack spacing={3} >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Stack spacing={0}>
                        <Typography
                            variant={isSmallScreen ? "h5" : "h4"}
                            sx={{
                                color: '#593030',
                                fontWeight: 700,
                                letterSpacing: '.2rem'
                            }}
                        >{heading}</Typography>

                        <Box className="headBar" />
                    </Stack>

                    {isSmallScreen || slides.length <= 5 ? null : (
                        <Navigators config={navigatorConfig} swiperRef={swiperRef} slideBtnConfig={slideBtnConfig} />
                    )}
                </Box>

                <Swiper
                    spaceBetween={spacePerSize}
                    slidesPerView={slidesPerSize}
                    {...(isSmallScreen
                        ? {}
                        : {
                            ref: swiperRef,
                            onSlideChange: SlideIndexHandler,
                        })}
                >
                    {slides.map(item => (
                        <SwiperSlide
                            key={isRecommend ? item.entry.mal_id : item.mal_id}
                        >

                            <ItemContent item={item} isRecommend={isRecommend} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Stack>
        </Box>
    )
}

export default MediaItem;