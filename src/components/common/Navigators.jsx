import { IconButton, Stack } from "@mui/material"
import '../../style/Navigators.css';

const Navigators = ({
    config,
    swiperRef,
    slideBtnConfig = {
        activeIndex: 0,
        lastSlideIndex: 0
    }
}) => {
    const isPrevDisable = config.label === 'MediaItem' && slideBtnConfig.activeIndex === slideBtnConfig.lastSlideIndex ? true : false;
    const isNextDisable = config.label === 'MediaItem' && slideBtnConfig.activeIndex === 0 ? true : false;

    const handleNext = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };

    const handlePrev = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };


    return (
        <Stack
            direction={config.position}
            alignItems="center"
            spacing={1}
            className={config.label === 'MainSlider' ? 'naviSlide' : 'naviItem'}
            zIndex={2}
        >
            <IconButton
                className={isNextDisable ? `disableBtn ${config.class}` : config.class}
                onClick={config.label === 'MainSlider' ? handleNext : handlePrev}
                disabled={isNextDisable}
            >
                {config.iconBtn1}
            </IconButton>

            <IconButton
                className={isPrevDisable ? `disableBtn ${config.class}` : config.class}
                onClick={config.label === 'MainSlider' ? handlePrev : handleNext}
                disabled={isPrevDisable}
            >
                {config.iconBtn2}
            </IconButton>
        </Stack >
    )
}

export default Navigators;