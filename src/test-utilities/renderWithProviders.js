// Testing Library
import { render } from '@testing-library/react';

// Providers
import { Provider } from 'react-redux';
import { RouterContext } from 'next/dist/shared/lib/router-context';

// Test Utilities
import { setupStore } from './setupStore';
import { createMockRouter } from './createMockRouter';

export function renderWithProviders(component, store = setupStore({}), router = createMockRouter()) {
    render(
        <Provider store={store}>
            <RouterContext.Provider value={router}>{component}</RouterContext.Provider>
        </Provider>
    );

    return { store, router };
}
