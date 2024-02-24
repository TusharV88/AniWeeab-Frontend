import { createSlice } from '@reduxjs/toolkit';


export const mediaDetailSlice = createSlice({
    name: 'mediaDetailSlice',
    initialState: [],
    reducers: {
        initMediaDetail(state, action) {
            state.push(action.payload);
        },
        resetMediaDetail(state) {
            return []; 
        },
    }
});

export const { initMediaDetail, resetMediaDetail } = mediaDetailSlice.actions;
export default mediaDetailSlice.reducer;