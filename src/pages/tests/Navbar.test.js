// Testing Library
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Test Utilities
import { renderWithProviders } from '@/test-utilities/renderWithProviders';

// Components
import { Navbar } from '../components/barrels';

test('logo redirects user to /', async () => {
    const { router } = renderWithProviders(<Navbar />);

    const logo = screen.getByAltText('Bonnie & Clyde Logo');

    await userEvent.click(logo);
    expect(router.push).toHaveBeenCalledWith('/');
});

test('login button redirects user to /login', async () => {
    const { router } = renderWithProviders(<Navbar />);

    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.click(loginButton);
    expect(router.push).toHaveBeenCalledWith('/login');
});
