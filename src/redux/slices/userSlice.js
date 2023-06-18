import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    info: null,
    jwt: null,
    authenticated: false,
    partner: false,
    receivedMatch: false,
    receivedMatchBy: null,
    sentMatch: false,
    sentMatchTo: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.jwt = action.payload;
            state.authenticated = true;
        },
        logout: state => {
            state.data = null;
            state.authenticated = false;
        },
        sendMatch: (state, action) => {
            state.sentMatch = true;
            state.sentMatchTo = action.payload;
        },
        declineMatch: state => {
            state.receivedMatch = false;
            state.receivedMatchBy = null;
        },
        acceptMatch: state => {
            state.receivedMatch = false;
            state.partner = state.receivedMatchBy;
            state.receivedMatchBy = null;
        },
    },
});

export const { login, logout, sendMatch, declineMatch, acceptMatch } = userSlice.actions;
export default userSlice.reducer;
