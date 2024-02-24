import { createSlice } from '@reduxjs/toolkit';


export const recommendationSlice = createSlice({
    name: 'recommendationSlice',
    initialState: [],
    reducers: {
        initRecommendation(state, action) {
            state.push(action.payload);
        },
        resetRecommendation(state) {
            return []; 
        },
    }
});

export const { initRecommendation, resetRecommendation } = recommendationSlice.actions;
export default recommendationSlice.reducer;