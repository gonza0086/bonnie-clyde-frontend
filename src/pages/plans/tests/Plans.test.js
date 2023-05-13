// Testing Library
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import Plans from '..';

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
