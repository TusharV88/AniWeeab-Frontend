import { createSlice } from '@reduxjs/toolkit';

const favoriteMangaSlice = createSlice({
    name: 'favoriteMangaSlice',
    initialState: [],
    reducers: {
        initFavoriteManga(state, action) {
            state.push(action.payload);
        },
        resetFavoriteManga(state) {
            return []; 
        },
    },
});

export const { initFavoriteManga, resetFavoriteManga } = favoriteMangaSlice.actions;
export default favoriteMangaSlice.reducer;