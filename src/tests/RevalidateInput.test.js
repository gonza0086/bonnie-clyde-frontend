import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { FormInput } from '@/components';
import RevalidateInput from '@/components/RevalidateInput';

test('error messaage appears when repeat-password value does not match pasword value', async () => {
    render(
        <RevalidateInput id='repeat-password' type='password' required updateValue={() => {}}>
            <FormInput id='password' type='password' required />
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
