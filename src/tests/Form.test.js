import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Form, FormInput } from '@/components';

test('form button is disabled while required fields are not filled', async () => {
    render(
        <Form>
            <FormInput id='username' required />
            <FormInput id='email' type='email' />
        </Form>
    );

    const formButton = screen.getByRole('button', { name: 'Signup' });
    const usernameInput = screen.getByLabelText('Username *');
    const emailInput = screen.getByLabelText('Email');

    expect(formButton).toBeDisabled();

    await userEvent.type(usernameInput, 'Gonzalo');
    fireEvent.blur(usernameInput);
    expect(formButton).toBeDisabled();

    await userEvent.type(emailInput, 'Gonzalo@gmailcom');
    fireEvent.blur(emailInput);
    expect(formButton).toBeDisabled();

    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'Gonzalo@gmail.com');
    fireEvent.blur(emailInput);
    expect(formButton).not.toBeDisabled();

    await userEvent.clear(usernameInput);
    fireEvent.blur(usernameInput);
    expect(formButton).toBeDisabled();

    await userEvent.type(usernameInput, 'Gonzalo');
    fireEvent.blur(usernameInput);
    expect(formButton).not.toBeDisabled();
});
