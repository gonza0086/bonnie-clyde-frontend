// Testing Library
import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import Plan from '../components/Plan';
import { renderWithProviders } from '@/test-utilities/renderWithProviders';

// Mocked
const mockedPlan = {
    id: 0,
    title: 'Paseo Jardin Japones',
    location: 'Palermo',
    comments: 'Paseo por el jardin japones y almorzamos sushi!',
    images: [],
    tags: ['Dia', 'Outdoor', 'Restaurant'],
    status: 0,
    createdBy: 'Gonzalo Hernandez',
    stars: 0,
};

test('after submiting the edit form the form itself is closed and the updated plan is shown', async () => {
    const onClick = jest.fn();
    const onUpdate = jest.fn();
    renderWithProviders(<Plan plan={mockedPlan} onClick={onClick} onUpdate={onUpdate} />);

    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    await userEvent.type(screen.getByLabelText('Title *'), 'Another plan');
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));

    expect(screen.queryByText('Edit Plan')).toBeNull();
});

test('the edit form has the field completed with the actual data of the plan', async () => {
    renderWithProviders(<Plan plan={mockedPlan} />);

    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));

    expect(screen.getByLabelText('Title *')).toHaveValue('Paseo Jardin Japones');
    expect(screen.getByLabelText('Location')).toHaveValue('Palermo');
    expect(screen.getByLabelText('Comments')).toHaveValue('Paseo por el jardin japones y almorzamos sushi!');
    expect(screen.getByText('Dia')).toBeInTheDocument();
    expect(screen.getByText('Outdoor')).toBeInTheDocument();
    expect(screen.getByText('Restaurant')).toBeInTheDocument();
});
