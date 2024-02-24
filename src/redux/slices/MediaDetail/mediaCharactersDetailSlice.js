import { createSlice } from '@reduxjs/toolkit';


export const mediaCharactersDetailSlice = createSlice({
    name: 'mediaCharactersDetailSlice',
    initialState: [],
    reducers: {
        initMediaCharactersDetail(state, action) {
            state.push(action.payload);
        },
        resetMediaCharactersDetail(state) {
            return []; 
        },
    }
});

export const { initMediaCharactersDetail, resetMediaCharactersDetail } = mediaCharactersDetailSlice.actions;
export default mediaCharactersDetailSlice.reducer;