import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Signup from '.';

test('form button is disabled while required fields are not filled', async () => {
    render(<Signup />);

    const formButton = screen.getByRole('button', { name: 'Signup' });
    const usernameInput = screen.getByLabelText('Username *');
    const emailInput = screen.getByLabelText('Email *');
    const passwordInput = screen.getByLabelText('Password *');
    const repeatPasswordInput = screen.getByLabelText('Repeat password *');

    expect(formButton).toBeDisabled();
    await userEvent.click(usernameInput);
    await userEvent.keyboard('Gonzalo');

    await userEvent.click(emailInput);
    await userEvent.keyboard('gonzalo@gmail.com');

    await userEvent.click(passwordInput);
    await userEvent.keyboard('password');

    await userEvent.click(repeatPasswordInput);
    await userEvent.keyboard('password');
    expect(formButton).not.toBeDisabled();

    await userEvent.clear(usernameInput);
    expect(formButton).toBeDisabled();
});
