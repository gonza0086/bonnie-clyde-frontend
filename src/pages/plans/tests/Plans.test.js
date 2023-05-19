// Testing Library
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import Plans from '..';
import { renderWithProviders } from '@/test-utilities/renderWithProviders';

test('when clicking plan summary the detail of the summary opens', async () => {
    render(<Plans />);

    const plan = screen.getByText('Paseo Jardin Japones');
    expect(screen.queryByText('Paseo Jardin Japones Details')).toBeNull();

    await userEvent.click(plan);
    expect(screen.getByText('Paseo Jardin Japones Details')).toBeInTheDocument();
});

test('when plan detail is opened after clicking the close icon the detail is closed', async () => {
    render(<Plans />);

    const plan = screen.getByText('Paseo Jardin Japones');
    await userEvent.click(plan);

    const closeIcon = screen.getByTestId('CloseIcon');
    await userEvent.click(closeIcon);
    expect(screen.queryByText('Paseo Jardin Japones Details')).toBeNull();
});

test('when clicking the new button form for creating a plan is opened', async () => {
    renderWithProviders(<Plans />);

    const newButton = screen.getByRole('button', { name: 'New Plan' });
    expect(screen.queryByText('Create Plan')).toBeNull();

    await userEvent.click(newButton);
    expect(screen.getByText('Create Plan')).toBeInTheDocument();
});

test('when clicking the cancel button form for creating a plan is closed', async () => {
    renderWithProviders(<Plans />);

    const newButton = screen.getByRole('button', { name: 'New Plan' });

    await userEvent.click(newButton);
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    await userEvent.click(cancelButton);
    expect(screen.queryByText('Create Plan')).toBeNull();
});

test('if form is opened and a plan is clicked the form is closed and viceversa', async () => {
    renderWithProviders(<Plans />);

    const newButton = screen.getByRole('button', { name: 'New Plan' });
    const plan = screen.getByText('Paseo Jardin Japones');

    await userEvent.click(newButton);
    await userEvent.click(plan);

    expect(screen.queryByText('Create Plan')).toBeNull();
    expect(screen.queryByText('Paseo Jardin Japones Details')).toBeInTheDocument();

    await userEvent.click(newButton);
    expect(screen.queryByText('Create Plan')).toBeInTheDocument();
    expect(screen.queryByText('Paseo Jardin Japones Details')).toBeNull();
});
