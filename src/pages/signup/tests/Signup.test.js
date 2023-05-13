// Testing Library
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Test Utilities
import { renderWithProviders } from '@/test-utilities/renderWithProviders.js';

// Components
import Signup from '../index.jsx';

// Mocks
import { server } from './mocks/server.js';
require('jest-fetch-mock').enableMocks();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('After completing the form and clicking the signup button the user gets redirect to finder', async () => {
    const { store, router } = renderWithProviders(<Signup />);

    const firstNameInput = screen.getByLabelText('First name *');
    const lastNameInput = screen.getByLabelText('Last name *');
    const emailInput = screen.getByLabelText('Email *');
    const passwordInput = screen.getByLabelText('Password *');
    const repeatPasswordInput = screen.getByLabelText('Repeat password *');
    const formButton = screen.getByRole('button', { name: 'Signup' });

    await userEvent.type(firstNameInput, 'Gonzalo');
    await userEvent.type(lastNameInput, 'Hernandez');
    await userEvent.type(emailInput, 'gonza@gmail.com');
    await userEvent.type(passwordInput, 'Password123');
    await userEvent.type(repeatPasswordInput, 'Password123');
    await userEvent.click(formButton);

    expect(store.getState().user).toStrictEqual({
        authenticated: true,
        data: {
            firstName: 'Gonzalo',
            lastName: 'Hernandez',
            email: 'gonza@gmail.com',
            password: 'Password123',
        },
    });
    expect(router.push).toHaveBeenCalledWith('/');
});

test('After completing the form and clicking the signup button error message appears: user already exists', async () => {
    renderWithProviders(<Signup />);

    const firstNameInput = screen.getByLabelText('First name *');
    const lastNameInput = screen.getByLabelText('Last name *');
    const emailInput = screen.getByLabelText('Email *');
    const passwordInput = screen.getByLabelText('Password *');
    const repeatPasswordInput = screen.getByLabelText('Repeat password *');
    const formButton = screen.getByRole('button', { name: 'Signup' });

    await userEvent.type(firstNameInput, 'Gonzalo');
    await userEvent.type(lastNameInput, 'Hernandez');
    await userEvent.type(emailInput, 'hgonzalo2000@gmail.com');
    await userEvent.type(passwordInput, 'Password123');
    await userEvent.type(repeatPasswordInput, 'Password123');
    await userEvent.click(formButton);

    expect(screen.queryByText('user already exists')).toBeInTheDocument();
});
