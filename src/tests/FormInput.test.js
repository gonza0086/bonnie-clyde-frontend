import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { FormInput } from '@/components';

test('error message appears when required input is cleared', async () => {
    render(<FormInput id='username' required />);

    const usernameInput = screen.getByLabelText('Username *');

    expect(screen.queryByText('username is empty!')).toBeNull();

    await userEvent.type(usernameInput, 'gonzalo');
    fireEvent.blur(usernameInput);
    expect(screen.queryByText('username is empty!')).toBeNull();

    await userEvent.clear(usernameInput);
    fireEvent.blur(usernameInput);
    expect(screen.getByText('username is empty!'));
});

test('error message appears when email input dont have an email', async () => {
    render(<FormInput id='email' type='email' />);

    const emailInput = screen.getByLabelText('Email');

    await userEvent.type(emailInput, 'gonzalo');
    fireEvent.blur(emailInput);
    expect(screen.getByText('that is not a valid email!'));

    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'gonzalo@gmail');
    fireEvent.blur(emailInput);
    expect(screen.getByText('that is not a valid email!'));

    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'gonzalo@gmail.com');
    fireEvent.blur(emailInput);
    expect(screen.queryByText('that is not a valid email!')).toBeNull();

    await userEvent.clear(emailInput);
    fireEvent.blur(emailInput);
    expect(screen.queryByText('email is empty!')).toBeNull();
});

test('password input is shown after clicking the show button', async () => {
    render(<FormInput id='password' type='password' />);

    const passwordInput = screen.getByLabelText('Password');
    const showButton = screen.getByRole('button');

    await userEvent.type(passwordInput, 'pass123');
    fireEvent.blur(passwordInput);
    expect(screen.queryByRole('textbox', { value: 'pass123' })).toBeNull();

    await userEvent.click(showButton);
    expect(screen.getByRole('textbox', { value: 'pass123' }));
});

test('error message appears if password do not have a min length of 8, at least 1 capital letter and at least 1 number', async () => {
    render(<FormInput id='password' type='password' />);

    const passwordInput = screen.getByLabelText('Password');

    await userEvent.type(passwordInput, 'password');
    fireEvent.blur(passwordInput);
    expect(screen.getByText('password is not valid!'));

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'password123');
    fireEvent.blur(passwordInput);
    expect(screen.getByText('password is not valid!'));

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'Password');
    fireEvent.blur(passwordInput);
    expect(screen.getByText('password is not valid!'));

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'PASSWORD123');
    fireEvent.blur(passwordInput);
    expect(screen.getByText('password is not valid!'));

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'Password123');
    fireEvent.blur(passwordInput);
    expect(screen.queryByText('password is not valid!')).toBeNull();
});
