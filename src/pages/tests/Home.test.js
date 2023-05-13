import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context.js';
import { createMockRouter } from '@/test-utilities/createMockRouter.js';
import Home from '..';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../redux/slices/userSlice';

describe('<Landing />', () => {
    test('get started button redirects user to /signup', async () => {
        const router = createMockRouter();
        render(
            <Provider store={store}>
                <RouterContext.Provider value={router}>
                    <Home />
                </RouterContext.Provider>
            </Provider>
        );

        const getStartedButton = screen.getByRole('button', { name: 'Get Started' });

        await userEvent.click(getStartedButton);
        expect(router.push).toHaveBeenCalledWith('/signup');
    });
});

describe('<Finder />', () => {
    test('when user is authenticated but does not have a partner finder renders', () => {
        const store = configureStore({
            reducer: {
                user: userReducer,
            },
            preloadedState: {
                user: { authenticated: true, partner: null },
            },
        });
        render(
            <Provider store={store}>
                <RouterContext.Provider value={createMockRouter()}>
                    <Home />
                </RouterContext.Provider>
            </Provider>
        );

        expect(screen.getByText('Find your partner'));
    });
});
