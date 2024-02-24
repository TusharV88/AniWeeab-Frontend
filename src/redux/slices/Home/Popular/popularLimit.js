import { createSlice } from '@reduxjs/toolkit';

const popularLimitSlice = createSlice({
    name: 'popularLimitSlice',
    initialState: 0,
    reducers: {
        incPopular(state, action) {
            return 1;
        },
        decPopular(state) {
            return 0; 
        },
    },
});

export const { incPopular, decPopular } = popularLimitSlice.actions;
export default popularLimitSlice.reducer;