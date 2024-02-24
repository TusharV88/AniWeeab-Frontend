import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import MediaTitleBar from "./MediaTitleBar";

const DetailStacked = ({ heading, item, state }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            {item[state] ? (
                <Stack spacing={3} marginTop='80px'>
                    <MediaTitleBar heading={heading} />

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Stack spacing={3} width="95%">
                            {item[state] ? (
                                state === 'title' ? (
                                    <Typography
                                        variant={isExtraSmallScreen ? "h6" : isSmallScreen ? "h5" : "h4"}
                                        color="#593030"
                                        fontWeight="700"
                                    >
                                        Title:
                                        <Typography variant="span" color="#ff3838"> {item.title}</Typography>
                                    </Typography>
                                ) : (
                                    <Typography
                                        variant={isExtraSmallScreen ? "body1" : isSmallScreen ? "h6" : "h5"}
                                        fontWeight='700'
                                        color='#593030'
                                        className="styler"
                                    >
                                        {item[state]}
                                    </Typography>
                                )) : null}

                            {state === "title" && item.title_japanese ? (
                                <Typography
                                    variant={isExtraSmallScreen ? "h6" : isSmallScreen ? "h5" : "h4"}
                                    color="#593030"
                                    fontWeight="700"
                                >
                                    Japanese-Title:
                                    <Typography variant="span" color="#ff3838"> {item.title_japanese}</Typography>
                                </Typography>
                            ) : null}

                            {state === "title" && item.title_english ? (
                                <Typography
                                    variant={isExtraSmallScreen ? "h6" : isSmallScreen ? "h5" : "h4"}
                                    color="#593030"
                                    fontWeight="700"
                                >
                                    English-Title:
                                    <Typography variant="span" color="#ff3838"> {item.title_english}</Typography>
                                </Typography>
                            ) : null}
                        </Stack>
                    </Box>
                </Stack>
            ) : null}
        </>
    )
}

export default DetailStacked;