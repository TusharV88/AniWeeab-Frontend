import { createSlice } from '@reduxjs/toolkit';


export const seasonsLimit = createSlice({
    name: 'seasonsLimit',
    initialState: 0,
    reducers: {
        incSeaons(state) {
            return 1;
        },
        decSeasons(state) {
            return 0; 
        },
    },
});

export const { incSeaons, decSeasons } = seasonsLimit.actions;
export default seasonsLimit.reducer;