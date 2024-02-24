import { createSlice } from '@reduxjs/toolkit';

const mediaDetailLimitSlice = createSlice({
    name: 'mediaDetailLimit',
    initialState: 0,
    reducers: {
        incMediaDetail(state) {
            return 1;
        },
        decMediaDetail(state) {
            return 0; 
        },
    },
});

export const { incMediaDetail, decMediaDetail } = mediaDetailLimitSlice.actions;
export default mediaDetailLimitSlice.reducer;