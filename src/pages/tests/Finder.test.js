// Testing Library
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Components
import { Finder } from '../components/barrels';

test('When clicking on a profile summary the profile of that user is shown', async () => {
    render(<Finder />);

    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button');

    await userEvent.type(searchInput, 'Gonzalo');
    await userEvent.click(searchButton);

    const summary = screen.getByText('Gonzalo Hernandez');

    await userEvent.click(summary);
    expect(screen.getByText('Sex: Male')).toBeInTheDocument();
    expect(screen.getByText('Country: Argentina')).toBeInTheDocument();
    expect(screen.getByText('Birthday: August 12 2000')).toBeInTheDocument();
});

test('When clicking on the profile close button the profile is closed', async () => {
    render(<Finder />);

    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button');

    await userEvent.type(searchInput, 'Gonzalo');
    await userEvent.click(searchButton);

    const summary = screen.getByText('Gonzalo Hernandez');

    await userEvent.click(summary);

    const closeButton = screen.getByTestId('CloseIcon');

    await userEvent.click(closeButton);
    expect(screen.queryByText('Sex: Male')).not.toBeInTheDocument();
    expect(screen.queryByText('Country: Argentina')).not.toBeInTheDocument();
    expect(screen.queryByText('Birthday: August 12 2000')).not.toBeInTheDocument();
});
