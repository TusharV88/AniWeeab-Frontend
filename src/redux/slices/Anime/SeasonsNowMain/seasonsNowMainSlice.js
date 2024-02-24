import { createSlice } from '@reduxjs/toolkit';

const seasonsNowAnimeMainSlice = createSlice({
    name: 'seasonsNowAnimeMain',
    initialState: [],
    reducers: {
        initSeasonsNowAnimeMain(state, action) {
            state.push(action.payload);
        },
        resetSeasonsNowAnimeMain(state) {
            return []; 
        },
    },
});

export const { initSeasonsNowAnimeMain, resetSeasonsNowAnimeMain } = seasonsNowAnimeMainSlice.actions;
export default seasonsNowAnimeMainSlice.reducer;