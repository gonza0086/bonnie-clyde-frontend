// Testing Library
import { render } from '@testing-library/react';

// Providers
import { Provider } from 'react-redux';
import { RouterContext } from 'next/dist/shared/lib/router-context';

// Test Utilities
import { setupStore } from './setupStore';
import { createMockRouter } from './createMockRouter';
import ThemeContext from '@/contexts/ThemeContext';

export function renderWithProviders(component, store = setupStore({}), router = createMockRouter()) {
    render(
        <ThemeContext>
            <Provider store={store}>
                <RouterContext.Provider value={router}>{component}</RouterContext.Provider>
            </Provider>
        </ThemeContext>
    );

    return { store, router };
}
