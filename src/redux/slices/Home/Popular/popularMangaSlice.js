import { createSlice } from '@reduxjs/toolkit';

const popularMangaSlice = createSlice({
    name: 'popularMangaSlice',
    initialState: [],
    reducers: {
        initPopularManga(state, action) {
            state.push(action.payload);
        },
        resetPopularManga(state) {
            return []; 
        },
    },
});

export const { initPopularManga, resetPopularManga } = popularMangaSlice.actions;
export default popularMangaSlice.reducer;