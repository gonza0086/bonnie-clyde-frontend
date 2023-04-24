import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Input, PasswordInput, RevalidateInput } from '@/components';

describe('<Input />', () => {
    test('error message appears when required input is cleared', async () => {
        render(<Input id='username' required updateValue={() => {}} />);

        const usernameInput = screen.getByLabelText('Username *');

        expect(screen.queryByText('required input is empty!')).toBeNull();

        await userEvent.type(usernameInput, 'gonzalo');
        fireEvent.blur(usernameInput);
        expect(screen.queryByText('required input is empty!')).toBeNull();

        await userEvent.clear(usernameInput);
        fireEvent.blur(usernameInput);
        expect(screen.getByText('required input is empty!'));
    });

    test('error message appears when email input dont have an email', async () => {
        render(<Input id='email' type='email' updateValue={() => {}} />);

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

    test('error message appears if password do not have a min length of 8, at least 1 capital letter and at least 1 number', async () => {
        render(<Input id='password' type='password' updateValue={() => {}} />);

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
});

describe('<PasswordInput />', () => {
    test('password input is shown after clicking the show button', async () => {
        render(<PasswordInput id='password' updateValue={() => {}} />);

        const passwordInput = screen.getByLabelText('Password');
        const showButton = screen.getByRole('button');

        await userEvent.type(passwordInput, 'pass123');
        fireEvent.blur(passwordInput);
        expect(screen.queryByRole('textbox', { value: 'pass123' })).toBeNull();

        await userEvent.click(showButton);
        expect(screen.getByRole('textbox', { value: 'pass123' }));
    });
});

describe('<RevalidatePassword />', () => {
    test('error messaage appears when repeat-password value does not match pasword value', async () => {
        render(
            <RevalidateInput id='repeat-password' type='password' required updateValue={() => {}}>
                <PasswordInput id='password' required updateValue={() => {}} />
            </RevalidateInput>
        );

        const passwordInput = screen.getByLabelText('Password *');
        const repeatPasswordInput = screen.getByLabelText('Repeat password *');

        await userEvent.type(passwordInput, 'Gonzalo360');
        fireEvent.blur(passwordInput);

        await userEvent.type(repeatPasswordInput, 'gonzalo360');
        fireEvent.blur(repeatPasswordInput);
        expect(screen.getByText('repeat-password does not match password!'));

        await userEvent.clear(repeatPasswordInput);
        await userEvent.type(repeatPasswordInput, 'Gonzalo360');
        fireEvent.blur(repeatPasswordInput);
        expect(screen.queryByText('repeat-password does not match password!')).toBeNull();

        await userEvent.clear(passwordInput);
        await userEvent.type(passwordInput, 'gonzalo360');
        fireEvent.blur(passwordInput);
        expect(screen.getByText('repeat-password does not match password!'));

        await userEvent.clear(passwordInput);
        await userEvent.type(passwordInput, 'Gonzalo360');
        fireEvent.blur(passwordInput);
        expect(screen.queryByText('repeat-password does not match password!')).toBeNull();
    });
});
