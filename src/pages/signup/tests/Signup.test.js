import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Signup from '../index.jsx';
import { RouterContext } from 'next/dist/shared/lib/router-context.js';
import { createMockRouter } from '@/test-utilities/createMockRouter.js';
import { server } from './mocks/server.js';
require('jest-fetch-mock').enableMocks();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('After completing the form and clicking the signup button the user gets redirect to finder', async () => {
    const router = createMockRouter();
    render(
        <RouterContext.Provider value={router}>
            <Signup />
        </RouterContext.Provider>
    );

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

    expect(router.push).toHaveBeenCalledWith('/finder');
});
