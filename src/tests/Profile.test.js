import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Profile } from '@/components';

const testUser = {
    id: 0,
    name: 'Gonzalo Hernandez',
    sex: 'Male',
    country: 'Argentina',
    birdthday: 'August 12 2000',
};

test('When clicking the close button the callback function is called', async () => {
    const onClose = jest.fn();
    render(<Profile user={testUser} onClose={onClose} />);

    const closeButton = screen.getByRole('button');

    await userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
});
