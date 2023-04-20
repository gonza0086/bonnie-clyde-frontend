import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { FormInput } from '@/components';

test('error message appears when input is cleared', async () => {
    render(<FormInput id='username' required type='text' />);

    const usernameInput = screen.getByLabelText('Username *');

    expect(screen.queryByText('username is empty!')).toBeNull();
    await userEvent.click(usernameInput);
    await userEvent.keyboard('gonzalo');

    expect(screen.queryByText('username is empty!')).toBeNull();
    await userEvent.clear(usernameInput);

    expect(screen.getByText('username is empty!'));
});
