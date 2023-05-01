import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context.js';
import { createMockRouter } from '@/utilites/tests/createMockRouter.js';
import Home from '..';

test('get started button redirects user to /signup', async () => {
    const router = createMockRouter();
    render(
        <RouterContext.Provider value={router}>
            <Home />
        </RouterContext.Provider>
    );

    const getStartedButton = screen.getByRole('button', { name: 'Get Started' });

    await userEvent.click(getStartedButton);
    expect(router.push).toHaveBeenCalledWith('/signup');
});
