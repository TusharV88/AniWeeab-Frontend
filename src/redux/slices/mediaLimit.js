import { createSlice } from '@reduxjs/toolkit';

const mediaLimitSlice = createSlice({
    name: 'mediaLimit',
    initialState: 0,
    reducers: {
        incMedia(state) {
            return 1;
        },
        decMedia(state) {
            return 0; 
        },
    },
});

export const { incMedia, decMedia } = mediaLimitSlice.actions;
export default mediaLimitSlice.reducer;