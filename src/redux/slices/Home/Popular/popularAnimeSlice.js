import { createSlice } from '@reduxjs/toolkit';

const popularAnimeSlice = createSlice({
    name: 'popularAnimeSlice',
    initialState: [],
    reducers: {
        initPopularAnime(state, action) {
            state.push(action.payload);
        },
        resetPopularAnime(state) {
            return []; 
        },
    },
});

export const { initPopularAnime, resetPopularAnime } = popularAnimeSlice.actions;
export default popularAnimeSlice.reducer;