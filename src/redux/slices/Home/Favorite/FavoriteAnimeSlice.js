import { createSlice } from '@reduxjs/toolkit';

const favoriteAnimeSlice = createSlice({
    name: 'favoriteAnimeSlice',
    initialState: [],
    reducers: {
        initFavoriteAnime(state, action) {
            state.push(action.payload);
        },
        resetFavoriteAnime(state) {
            return []; 
        },
    },
});

export const { initFavoriteAnime, resetFavoriteAnime } = favoriteAnimeSlice.actions;
export default favoriteAnimeSlice.reducer;