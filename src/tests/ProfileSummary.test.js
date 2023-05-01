import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ProfileSummary } from '@/components';

const testUser = {
    id: 0,
    name: 'Gonzalo Hernandez',
    sex: 'Male',
    country: 'Argentina',
    birdthday: 'August 12 2000',
};

test('when clicking summary body callback function is called with the data of the profile clicked', async () => {
    const onClick = jest.fn();
    render(<ProfileSummary user={testUser} onClick={onClick} />);

    const summaryBody = screen.getByText('Gonzalo Hernandez');

    await userEvent.click(summaryBody);
    expect(onClick).toHaveBeenCalledWith(testUser);
});

test('when clicking summary body callback function is called with the data of the profile clicked', async () => {
    const onClick = jest.fn();
    render(<ProfileSummary user={testUser} onClick={onClick} />);

    const summaryImage = screen.getByText('G');

    await userEvent.click(summaryImage);
    expect(onClick).toHaveBeenCalledWith(testUser);
});

test('When clicking match button callback function is called with the id of the profile clicked', async () => {
    const onSubmit = jest.fn();
    render(<ProfileSummary user={testUser} onSubmit={onSubmit} />);

    const submitButton = screen.getByRole('button');

    await userEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalledWith(testUser.id);
});
