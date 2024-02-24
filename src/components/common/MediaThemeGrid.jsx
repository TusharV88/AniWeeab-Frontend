import { Divider, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";


const MediaThemeGrid = ({ heading, data }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid
            container
            sx={{
                width: '95%',
                border: '2px solid #ff3838',
                borderRadius: '5px',
            }}>
            <Grid
                item
                xs={12}
                sm={12}
                md={12}
                sx={{
                    padding: isExtraSmallScreen ? '10px' : '20px',
                }}
            >
                <Typography
                    variant={isSmallScreen ? "h6" : "h5"}
                    fontWeight='700'
                    textAlign='center'
                    color='#281313'
                    marginBottom='10px'
                >
                    {heading}
                </Typography>
                <Divider />

                {data.length > 0 ? (
                    data.map((themes, index) => (
                        <Grid
                            key={index}
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            sx={{
                                padding: isExtraSmallScreen ? '10px' : '20px',
                            }}
                        >
                            <Typography
                                variant={isSmallScreen ? "body2" : "body1"}
                                fontWeight='700'
                                color='#593030'
                                className="styler"
                                textAlign='start'
                            >
                                {themes}
                            </Typography>
                        </Grid>
                    ))) : (
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{
                            padding: isExtraSmallScreen ? '10px' : '20px',
                        }}
                    >
                        <Typography
                            variant={isSmallScreen ? "body1" : "h5"}
                            fontWeight='700'
                            color='#593030'
                            className="styler"
                            textAlign='center'
                        >
                            No {heading.toLowerCase()} have been added to this title.
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Grid>
    )
}

export default MediaThemeGrid;