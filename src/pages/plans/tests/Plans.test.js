// Testing Library
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import Plans from '..';
import { renderWithProviders } from '@/test-utilities/renderWithProviders';
import { setupStore } from '@/test-utilities/setupStore';

test('when clicking plan summary the detail of the summary opens', async () => {
    renderWithProviders(<Plans />);

    const plan = screen.getByText('Paseo Jardin Japones');
    expect(screen.queryByRole('button', { name: 'Done' })).toBeNull();

    await userEvent.click(plan);
    expect(screen.getByRole('button', { name: 'Done' })).toBeInTheDocument();
});

test('when plan detail is opened after clicking the close icon the detail is closed', async () => {
    renderWithProviders(<Plans />);

    const plan = screen.getByText('Paseo Jardin Japones');
    await userEvent.click(plan);

    const closeIcon = screen.getByTestId('CloseIcon');
    await userEvent.click(closeIcon);
    expect(screen.queryByRole('button', { name: 'Done' })).toBeNull();
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
    expect(screen.queryByRole('button', { name: 'Done' })).toBeInTheDocument();

    await userEvent.click(newButton);
    expect(screen.queryByText('Create Plan')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Done' })).toBeNull();
});

test('when clicking the delete icon on a plan that plan is deleted', async () => {
    renderWithProviders(<Plans />);

    expect(screen.getByText('Paseo Jardin Japones')).toBeInTheDocument();
    const deleteButton = screen.getByTestId('DeleteIcon');

    await userEvent.click(deleteButton);
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.queryByText('Paseo Jardin Japones')).toBeNull();
});

test('after submiting the new plan form the plan summary is shown and the form is closed', async () => {
    renderWithProviders(<Plans />, setupStore({ user: { data: { firstName: 'Chiara', lastName: 'Bonanata' }, authenticated: true } }));

    await userEvent.click(screen.getByRole('button', { name: 'New Plan' }));
    await userEvent.type(screen.getByLabelText('Title *'), 'Ir a ver James Bond');
    await userEvent.click(screen.getByRole('button', { name: 'Create' }));

    expect(screen.getByText('Ir a ver James Bond')).toBeInTheDocument();
    expect(screen.getByText('Chiara Bonanata')).toBeInTheDocument();
    expect(screen.queryByText('Create Plan')).toBeNull();
});

test('after submiting the edit plan form the plan summary info related is changed accordingly', async () => {
    renderWithProviders(<Plans />);

    await userEvent.click(screen.getByText('Paseo Jardin Japones'));
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    await userEvent.clear(screen.getByLabelText('Title *'));
    await userEvent.type(screen.getByLabelText('Title *'), 'Ir al Paseo del Agua');
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));

    expect(screen.getAllByText('Ir al Paseo del Agua')).toHaveLength(2);
    expect(screen.getByText('Palermo')).toBeInTheDocument();
    expect(screen.getByText('Paseo por el jardin japones y almorzamos sushi!')).toBeInTheDocument();
});

test('after clicking the done button the status icon turns into green', async () => {
    renderWithProviders(<Plans />);

    const statusIcon = screen.getByTestId('CircleIcon');
    expect(statusIcon).toHaveStyle({ color: '#d32f2f' });

    await userEvent.click(screen.getByText('Paseo Jardin Japones'));
    await userEvent.click(screen.getByRole('button', { name: 'Done' }));

    expect(statusIcon).toHaveStyle({ color: '#2e7d32' });
});

test('when clicking the done button, the button itself disappears', async () => {
    renderWithProviders(<Plans />);

    await userEvent.click(screen.getByText('Paseo Jardin Japones'));
    const doneButton = screen.getByRole('button', { name: 'Done' });

    await userEvent.click(doneButton);
    expect(doneButton).not.toBeInTheDocument();
});
