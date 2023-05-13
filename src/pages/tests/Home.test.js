// Testing Library
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Test Utilities
import { renderWithProviders } from '@/test-utilities/renderWithProviders';
import { setupStore } from '@/test-utilities/setupStore';

// Components
import Home from '..';

describe('<Landing />', () => {
    test('get started button redirects user to /signup', async () => {
        const { router } = renderWithProviders(<Home />);

        const getStartedButton = screen.getByRole('button', { name: 'Get Started' });

        await userEvent.click(getStartedButton);
        expect(router.push).toHaveBeenCalledWith('/signup');
    });
});

describe('<Finder />', () => {
    test('when user is authenticated but does not have a partner finder renders', () => {
        const store = setupStore({ user: { authenticated: true } });
        renderWithProviders(<Home />, store);

        expect(screen.getByText('Find your partner'));
    });
});
