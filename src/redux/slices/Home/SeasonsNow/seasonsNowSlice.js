import { createSlice } from '@reduxjs/toolkit';

const seasonsNowSlice = createSlice({
    name: 'seasonsNow',
    initialState: [],
    reducers: {
        initSeasonsNow(state, action) {
            state.push(action.payload);
        },
        resetSeasonsNow(state) {
            return []; 
        },
    },
});

export const { initSeasonsNow, resetSeasonsNow } = seasonsNowSlice.actions;
export default seasonsNowSlice.reducer;