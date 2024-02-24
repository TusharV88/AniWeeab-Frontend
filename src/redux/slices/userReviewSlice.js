import { createSlice } from '@reduxjs/toolkit';

const userReviewSlice = createSlice({
    name: 'userReview',
    initialState: [],
    reducers: {
        initUserReview(state, action) {
            state.push(action.payload);
        },
        resetUserReview: (state) => {
            return [];
        },
    },
});

export const { initUserReview, resetUserReview } = userReviewSlice.actions;
export default userReviewSlice.reducer;