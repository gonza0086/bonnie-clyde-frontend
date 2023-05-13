// Redux
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/slices/userSlice';

export function setupStore(initialState) {
    return configureStore({
        reducer: {
            user: userReducer,
        },
        preloadedState: initialState,
    });
}
