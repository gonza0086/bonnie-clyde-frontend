import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context.js';
import { createMockRouter } from '@/test-utilities/createMockRouter.js';
import { Navbar } from '../components/barrels';

test('logo redirects user to /', async () => {
    const router = createMockRouter();
    render(
        <RouterContext.Provider value={router}>
            <Navbar />
        </RouterContext.Provider>
    );

    const logo = screen.getByAltText('Bonnie & Clyde Logo');

    await userEvent.click(logo);
    expect(router.push).toHaveBeenCalledWith('/');
});

test('login button redirects user to /login', async () => {
    const router = createMockRouter();
    render(
        <RouterContext.Provider value={router}>
            <Navbar />
        </RouterContext.Provider>
    );

    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.click(loginButton);
    expect(router.push).toHaveBeenCalledWith('/login');
});
