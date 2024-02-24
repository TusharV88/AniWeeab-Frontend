import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Chip, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import CircularRate from './CircularRate';


const ItemContent = ({ item, label = '', isRecommend = false }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const isFavoritePage = useLocation().pathname === '/favorites' ? true : false;

    const imageUrl = isRecommend ? item.entry.images.jpg.large_image_url : isFavoritePage ? item.mediaImage : item.images.jpg.large_image_url;
    const itemID = isRecommend ? item.entry.mal_id : isFavoritePage ? item.mediaID : item.mal_id;
    const itemType = isFavoritePage ? item.mediaType : item.url.toLowerCase().includes('/anime/') ? 'anime' : 'manga';
    const itemTitle = isRecommend ? item.entry.title : isFavoritePage ? item.mediaTitle : item.title;
    const itemTitleEnglish = isFavoritePage ? item.mediaTitleEnglish === 'none' ? null : item.mediaTitleEnglish : item.title_english;


    const [hoverID, setHoverID] = useState(null);
    const [contentHeight, setContentHeight] = useState(0);

    const handleMouseEnter = (itemID) => setHoverID(itemID);
    const handleMouseLeave = () => setHoverID(null);

    useEffect(() => {
        if (hoverID) {
            const contentBox = document.getElementById(`insider_${hoverID}`);
            setContentHeight(contentBox.scrollHeight);
        }
    }, [hoverID]);


    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'strech',
                flexDirection: 'column-reverse',
                textDecoration: 'none',
                height: isSmallScreen ? '280px' : '400px',
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                borderRadius: '5px',
            }}
            {...(isSmallScreen
                ? {}
                : {
                    onMouseEnter: () => handleMouseEnter(itemID),
                    onMouseLeave: handleMouseLeave,
                })}
            component={Link}
            to={`/${itemType}/${itemID}`}
        >
            <Box
                className='boxer'
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'end',
                    width: '100%',
                    borderRadius: '5px',
                    height: isSmallScreen ? '100%' : hoverID === itemID ? '100%' : '0',
                    transition: 'height .2s ease',
                }}
            >
                <Stack
                    id={`insider_${itemID}`}
                    spacing={2}
                    sx={{
                        width: '95%',
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                        position: 'relative',
                        overflow: 'hidden',
                        height: isSmallScreen ? 'max-content' : hoverID === itemID ? `${contentHeight}px` : '0',
                        opacity: isSmallScreen ? 1 : hoverID === itemID ? 1 : 0,
                        transition: 'height .2s ease, opacity .4s ease',
                    }}
                >
                    <Stack
                        width='100%'
                        spacing={isSmallScreen ? 3 : 2}
                    >
                        <Stack
                            spacing={0}
                            sx={{
                                display: 'flex',
                                alignItems: 'start'
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: isSmallScreen ? 1 : 2,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    color: 'white',
                                    fontWeight: '600'
                                }}
                            >{itemTitle}</Typography>

                            {!isRecommend && itemTitleEnglish ? (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: isSmallScreen ? 1 : 2,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        color: 'white',
                                    }}
                                >{itemTitleEnglish}</Typography>
                            ) : null}
                        </Stack>

                        {label === 'favorites' ? null : (
                            <>
                                {!isRecommend && item.genres ?
                                    (
                                        <Stack
                                            useFlexGap
                                            flexWrap="wrap"
                                            direction='row'
                                            spacing={isSmallScreen ? 1 : 2}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {item.score ? (
                                                <CircularRate value={item.score} rateSize={40} />
                                            ) : null}

                                            {item.genres.map((genre, index) => {
                                                if (index === 0 && isSmallScreen) {
                                                    return (
                                                        <Chip
                                                            key={genre.mal_id}
                                                            size='small'
                                                            sx={{
                                                                bgcolor: '#ff3838',
                                                                color: 'white',
                                                                borderRadius: '5px',
                                                            }}
                                                            label={genre.name}
                                                        />
                                                    );
                                                }
                                                else if (index <= 1 && isSmallScreen != true) {
                                                    return (
                                                        <Chip
                                                            key={genre.mal_id}
                                                            size='small'
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

                                {!isRecommend && item.synopsis ? (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: isSmallScreen ? 2 : 3,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            color: 'white',
                                        }}
                                    >{item.synopsis}</Typography>
                                ) : null}
                            </>
                        )}
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}

export default ItemContent;