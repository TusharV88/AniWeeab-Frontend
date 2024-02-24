import { createSlice } from '@reduxjs/toolkit';

const userFavoriteSlice = createSlice({
    name: 'userFavorite',
    initialState: [],
    reducers: {
        initUserFavorite(state, action) {
            state.push(action.payload);
        },
        resetUserFavorite: (state) => {
            return [];
        },
    },
});

export const { initUserFavorite, resetUserFavorite } = userFavoriteSlice.actions;
export default userFavoriteSlice.reducer;