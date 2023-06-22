import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    info: {
        partner: null,
        jwt: null,
    },
    authenticated: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.info.jwt = action.payload;
            state.authenticated = true;
        },
        logout: state => {
            state.info = { partner: null, jwt: null };
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
        match: (state, action) => {
            state.info.partner = action.payload;
        },
    },
});

export const { login, logout, sendMatch, declineMatch, acceptMatch, match } = userSlice.actions;
export default userSlice.reducer;
