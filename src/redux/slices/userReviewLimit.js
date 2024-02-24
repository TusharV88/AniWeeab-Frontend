import { createSlice } from '@reduxjs/toolkit';

const userReviewLimitSlice = createSlice({
    name: 'userReviewLimit',
    initialState: 0,
    reducers: {
        incUserReview(state) {
            return 1;
        },
        decUserReview(state) {
            return 0; 
        },
    },
});

export const { incUserReview, decUserReview } = userReviewLimitSlice.actions;
export default userReviewLimitSlice.reducer;