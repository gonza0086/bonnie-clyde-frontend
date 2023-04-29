import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Searchbar } from '@/components';

test('searchbar pass to the callback function the text you wrote in it when clicking the submit icon', async () => {
    const onSearch = jest.fn();
    render(<Searchbar onSearch={onSearch} />);

    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button');

    await userEvent.type(searchInput, 'Gonzalo');
    await userEvent.click(searchButton);
    expect(onSearch).toHaveBeenCalledWith('Gonzalo');
});
