// Testing Library
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Test Utilities
import { renderWithProviders } from '@/test-utilities/renderWithProviders';

// components
import Login from '..';

// Mocks
import { server } from './mocks/server.js';
require('jest-fetch-mock').enableMocks();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('After completing the form and clicking the signup button the user gets redirect to Home', async () => {
    const { router, store } = renderWithProviders(<Login />);

    const usernameInput = screen.getByLabelText('Email *');
    const passwordInput = screen.getByLabelText('Password *');

    await userEvent.type(usernameInput, 'gonzaloh2000@hotmail.com');
    await userEvent.type(passwordInput, 'Correct123');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(store.getState().user).toStrictEqual({
        authenticated: true,
        jwt: 'token',
        info: null,
        partner: null,
        receivedMatch: false,
        receivedMatchBy: null,
        sentMatch: false,
        sentMatchTo: null,
    });
    expect(router.push).toHaveBeenCalledWith('/');
});

test('email not exists is render when submiting a non registered email in the form', async () => {
    renderWithProviders(<Login />);

    const emailInput = screen.getByLabelText('Email *');
    const passwordInput = screen.getByLabelText('Password *');

    await userEvent.type(emailInput, 'hgonzalo2000@gmail.com');
    await userEvent.type(passwordInput, 'Password123');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('Email is not registered!'));
});

test('password is incorrect is render when submiting a wrong password in the form', async () => {
    renderWithProviders(<Login />);

    const emailInput = screen.getByLabelText('Email *');
    const passwordInput = screen.getByLabelText('Password *');

    await userEvent.type(emailInput, 'gonzaloh2000@hotmail.com');
    await userEvent.type(passwordInput, 'Password123');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('Password is incorrect!'));
});
