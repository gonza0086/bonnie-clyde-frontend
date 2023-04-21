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

    expect(screen.queryByText('that is not a valid email!')).toBeNull();

    await userEvent.type(emailInput, 'gonzalo');
    fireEvent.blur(emailInput);
    expect(screen.getByText('that is not a valid email!'));

    await userEvent.type(emailInput, 'gonzalo@gmail');
    fireEvent.blur(emailInput);
    expect(screen.getByText('that is not a valid email!'));

    await userEvent.type(emailInput, 'gonzalo@gmail.com');
    fireEvent.blur(emailInput);
    expect(screen.queryByText('that is not a valid email!')).toBeNull();

    await userEvent.clear(emailInput);
    fireEvent.blur(emailInput);
    expect(screen.queryByText('email is empty!')).toBeNull();
});
