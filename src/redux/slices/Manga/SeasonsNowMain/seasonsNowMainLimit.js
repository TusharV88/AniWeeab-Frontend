import { createSlice } from '@reduxjs/toolkit';

const seasonsNowMangaMainLimit = createSlice({
    name: 'seasonsNowMangaMainLimit',
    initialState: 0,
    reducers: {
        incSeasonsMangaMain(state) {
            return 1;
        },
        decSeasonsMangaMain(state) {
            return 0; 
        },
    },
});

export const { incSeasonsMangaMain, decSeasonsMangaMain } = seasonsNowMangaMainLimit.actions;
export default seasonsNowMangaMainLimit.reducer;