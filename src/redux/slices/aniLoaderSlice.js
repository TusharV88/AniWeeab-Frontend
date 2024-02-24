import { createSlice } from '@reduxjs/toolkit';

const aniLoaderSlice = createSlice({
    name: 'aniLoader',
    initialState: false,
    reducers: {
        startLoading(state) {
            return true;
        },
        stopLoading(state) {
            return false; 
        },
    },
});

export const { startLoading, stopLoading } = aniLoaderSlice.actions;
export default aniLoaderSlice.reducer;