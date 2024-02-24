import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        initUser(state, action) {
            return { ...state, ...action.payload };
        },
        resetUserState: (state) => {
            return {};
        },
    },
});

export const { initUser, resetUserState } = userSlice.actions;
export default userSlice.reducer;