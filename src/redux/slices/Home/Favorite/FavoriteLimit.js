import { createSlice } from '@reduxjs/toolkit';

const favoriteLimitSlice = createSlice({
    name: 'favoriteLimitSlice',
    initialState: 0,
    reducers: {
        incFavorite(state, action) {
            return 1;
        },
        decFavorite(state) {
            return 0; 
        },
    },
});

export const { incFavorite, decFavorite } = favoriteLimitSlice.actions;
export default favoriteLimitSlice.reducer;