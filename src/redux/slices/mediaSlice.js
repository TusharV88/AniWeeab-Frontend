import { createSlice } from '@reduxjs/toolkit';

const mediaSlice = createSlice({
    name: 'media',
    initialState: [],
    reducers: {
        initMedia(state, action) {
            state.push(action.payload);
        },
        resetMedia: (state) => {
            return [];
        },
    },
});

export const { initMedia, resetMedia } = mediaSlice.actions;
export default mediaSlice.reducer;
