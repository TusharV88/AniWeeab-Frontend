import { Box, Typography, CircularProgress } from "@mui/material";

const CircularRate = ({ value, rateSize }) => {
    const rating = parseFloat(value.toFixed(1));

    let rateColor;

    if (rating >= 9) {
        rateColor = '#FF5F6D'; // Bright Red
    } else if (rating >= 7) {
        rateColor = '#F4D35E'; // Bright Yellow
    } else if (rating >= 5) {
        rateColor = '#50BFE6'; // Bright Blue
    } else if (rating >= 3) {
        rateColor = '#FF6F61'; // Dark Orange
    } else if (rating >= 1) {
        rateColor = '#73D2DE'; // Light Blue
    } else {
        rateColor = '#6A0572'; // Dark Purple
    }



    return (
        <Box sx={{
            position: "relative",
            display: "inline-block",
            width: "max-content"
        }}>
            <CircularProgress variant="determinate" value={rating * 10} size={rateSize} sx={{ color: rateColor }} />
            <Box sx={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Typography
                    variant="caption"
                    component="div"
                    fontWeight="700"
                    sx={{ marginTop: "-5px", color: "white" }}
                >
                    {rating}
                </Typography>
            </Box>
        </Box>
    );
};

export default CircularRate;