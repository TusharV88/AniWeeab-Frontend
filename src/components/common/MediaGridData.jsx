import { Box, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import MediaTitleBar from "./MediaTitleBar";

const MediaGridData = ({ heading, item, data }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));


    function isValidState(state) {
        if (state === 'aired' || state === 'published') {
            return true;
        }
        return false;
    }

    function numberFormator(number, state) {
        if (typeof number !== 'number' || state === 'score' || state === 'year') {
            return number;
        }

        const numString = number.toString();
        const [integerPart, decimalPart] = numString.split('.');
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const formattedNumber = decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;

        return formattedNumber;
    }


    return (
        <Stack spacing={3} marginTop='80px'>
            <MediaTitleBar heading={heading} />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Grid container sx={{ width: '95%', border: '2px solid #ff3838', borderRadius: '5px' }}>
                    {data.map((infoItem, index) => (
                        <Grid
                            key={infoItem.state}
                            item
                            xs={12}
                            sm={12}
                            md={4}
                            sx={{
                                padding: isSmallScreen ? '10px' : '20px',
                                borderRight: '1px solid #ff3838',
                                borderBottom: '1px solid #ff3838'
                            }}
                        >
                            {infoItem.isArray ? (
                                item[infoItem.state].length === 0
                                    ? (
                                        <Typography variant={isSmallScreen ? "body1" : "h6"} className="gridData">
                                            {index + 1}. {infoItem.display}: None
                                        </Typography>
                                    )
                                    : (
                                        <Typography variant={isSmallScreen ? "body1" : "h6"} className="gridData">
                                            {index + 1}. {infoItem.display}:{' '}
                                            {item[infoItem.state].map((itemData, arrayIndex) => (
                                                <Typography variant="span" key={itemData.mal_id} style={{ color: '#ff3838' }}>
                                                    {itemData.name}{arrayIndex < item[infoItem.state].length - 1 ? ', ' : ''}
                                                </Typography>
                                            ))}
                                        </Typography>
                                    )
                            ) : (
                                <Typography variant={isSmallScreen ? "body1" : "h6"} className="gridData">
                                    {index + 1}. {infoItem.display}:{' '}
                                    <Typography variant="span" style={{ color: (isValidState(infoItem.state) ? item[infoItem.state].string : item[infoItem.state]) ? '#ff3838' : '#593030' }}>
                                        {isValidState(infoItem.state) ? item[infoItem.state].string ? item[infoItem.state].string : 'None' : item[infoItem.state] ? numberFormator(item[infoItem.state], infoItem.state) : 'None'}
                                    </Typography>
                                </Typography>
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Stack>
    )
}

export default MediaGridData;