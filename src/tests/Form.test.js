import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Form, Input, PasswordInput, RevalidateInput } from '@/components';

test('form button is disabled while required fields are not filled', async () => {
    render(
        <Form>
            <Input id='username' required />
            <Input id='email' type='email' />
        </Form>
    );

    const formButton = screen.getByRole('button', { name: 'Signup' });
    const usernameInput = screen.getByLabelText('Username *');
    const emailInput = screen.getByLabelText('Email');

    expect(formButton).toBeDisabled();

    await userEvent.type(usernameInput, 'Gonzalo');
    fireEvent.blur(usernameInput);
    expect(formButton).not.toBeDisabled();

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

test('onSubmit is called when submit button is clicked and send all the input values correctly', async () => {
    const onSubmit = jest.fn();
    render(
        <Form onSubmit={onSubmit}>
            <Input id='username' required />
            <Input id='email' type='email' required />
            <RevalidateInput id='repeat-password'>
                <PasswordInput id='password' type='password' required />
            </RevalidateInput>
        </Form>
    );

    const formButton = screen.getByRole('button', { name: 'Signup' });
    const usernameInput = screen.getByLabelText('Username *');
    const emailInput = screen.getByLabelText('Email *');
    const passwordInput = screen.getByLabelText('Password *');
    const repeatPasswordInput = screen.getByLabelText('Repeat password *');

    await userEvent.type(usernameInput, 'Gonzalo');
    fireEvent.blur(usernameInput);

    await userEvent.type(emailInput, 'gonzaloh2000@hotmail.com');
    fireEvent.blur(emailInput);

    await userEvent.type(passwordInput, 'Gonzalo360');
    fireEvent.blur(passwordInput);

    await userEvent.type(repeatPasswordInput, 'Gonzalo360');
    fireEvent.blur(repeatPasswordInput);

    await userEvent.click(formButton);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
        username: 'Gonzalo',
        email: 'gonzaloh2000@hotmail.com',
        password: 'Gonzalo360',
        'repeat-password': 'Gonzalo360',
    });
});
