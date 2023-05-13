// Testing Library
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Test Utilities
import { renderWithProviders } from '@/test-utilities/renderWithProviders';

// components
import Login from '..';

test('After completing the form and clicking the signup button the user gets redirect to partner-finder', async () => {
    const { router } = renderWithProviders(<Login />);

    const usernameInput = screen.getByLabelText('Username *');
    const passwordInput = screen.getByLabelText('Password *');
    const formButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(usernameInput, 'Gonza0086');
    await userEvent.type(passwordInput, 'Password123');
    await userEvent.click(formButton);

    expect(router.push).toHaveBeenCalledWith('/');
});
