import { createSlice } from '@reduxjs/toolkit';

const userFavoriteLimitSlice = createSlice({
    name: 'userFavoriteLimit',
    initialState: 0,
    reducers: {
        incUserFavorite(state) {
            return 1;
        },
        decUserFavorite(state) {
            return 0; 
        },
    },
});

export const { incUserFavorite, decUserFavorite } = userFavoriteLimitSlice.actions;
export default userFavoriteLimitSlice.reducer;
