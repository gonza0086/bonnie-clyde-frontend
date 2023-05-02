import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context.js';
import { createMockRouter } from '@/utilites/tests/createMockRouter.js';
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
