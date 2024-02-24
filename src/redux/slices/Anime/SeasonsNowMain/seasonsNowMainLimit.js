import { createSlice } from '@reduxjs/toolkit';

const seasonsNowAnimeMainLimit = createSlice({
    name: 'seasonsNowAnimeMainLimit',
    initialState: 0,
    reducers: {
        incSeasonsAnimeMain(state) {
            return 1;
        },
        decSeasonsAnimeMain(state) {
            return 0; 
        },
    },
});

export const { incSeasonsAnimeMain, decSeasonsAnimeMain } = seasonsNowAnimeMainLimit.actions;
export default seasonsNowAnimeMainLimit.reducer;