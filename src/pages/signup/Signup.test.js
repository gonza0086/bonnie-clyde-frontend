import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Signup from '.';

// test('form button is disabled while required fields are not filled', async () => {
//     render(<Signup />);
//
//     const formButton = screen.getByRole('button', { name: 'Signup' });
//     const usernameInput = screen.getByLabelText('Username *');
//     const emailInput = screen.getByLabelText('Email *');
//     const passwordInput = screen.getByLabelText('Password *');
//     const repeatPasswordInput = screen.getByLabelText('Repeat password *');
//
//     expect(formButton).toBeDisabled();
//
//     await userEvent.type(usernameInput, 'Gonzalo');
//     expect(formButton).toBeDisabled();
//
//     await userEvent.type(emailInput, 'gonzalo@gmail.com');
//     expect(formButton).toBeDisabled();
//
//     await userEvent.type(passwordInput, 'Password123');
//     expect(formButton).toBeDisabled();
//
//     await userEvent.type(repeatPasswordInput, 'Password123');
//     expect(formButton).not.toBeDisabled();
//
//     await userEvent.clear(usernameInput);
//     expect(formButton).toBeDisabled();
// });
