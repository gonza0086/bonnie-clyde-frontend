import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Signup from '../index.jsx';
import { RouterContext } from 'next/dist/shared/lib/router-context.js';

test('After completing the form and clicking the signup button the user gets redirect to partner-finder', async () => {
    const router = createMockRouter();
    render(
        <RouterContext.Provider value={router}>
            <Signup />
        </RouterContext.Provider>
    );

    const usernameInput = screen.getByLabelText('Username *');
    const emailInput = screen.getByLabelText('Email *');
    const passwordInput = screen.getByLabelText('Password *');
    const repeatPasswordInput = screen.getByLabelText('Repeat password *');
    const formButton = screen.getByRole('button', { name: 'Signup' });

    await userEvent.type(usernameInput, 'Gonza0086');
    await userEvent.type(emailInput, 'gonza@gmail.com');
    await userEvent.type(passwordInput, 'Password123');
    await userEvent.type(repeatPasswordInput, 'Password123');
    await userEvent.click(formButton);

    expect(router.push).toHaveBeenCalledWith('/finder');
});

export function createMockRouter(router) {
    return {
        basePath: '',
        pathname: '/',
        route: '/',
        query: {},
        asPath: '/',
        back: jest.fn(),
        beforePopState: jest.fn(),
        prefetch: jest.fn(),
        push: jest.fn(),
        reload: jest.fn(),
        replace: jest.fn(),
        events: {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        },
        isFallback: false,
        isLocaleDomain: false,
        isReady: true,
        defaultLocale: 'en',
        domainLocales: [],
        isPreview: false,
        ...router,
    };
}
