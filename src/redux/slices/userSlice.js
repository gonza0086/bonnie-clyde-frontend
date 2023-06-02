import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    info: null,
    authenticated: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.data = action.payload;
            state.authenticated = true;
        },
        logout: state => {
            state.data = null;
            state.authenticated = false;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
