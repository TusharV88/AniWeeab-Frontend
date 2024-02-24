import { createSlice } from '@reduxjs/toolkit';

const seasonsNowMangaMainSlice = createSlice({
    name: 'seasonsNowMangaMain',
    initialState: [],
    reducers: {
        initSeasonsNowMangaMain(state, action) {
            state.push(action.payload);
        },
        resetSeasonsNowMangaMain(state) {
            return []; 
        },
    },
});

export const { initSeasonsNowMangaMain, resetSeasonsNowMangaMain } = seasonsNowMangaMainSlice.actions;
export default seasonsNowMangaMainSlice.reducer;