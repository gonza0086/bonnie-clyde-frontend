// Testing Library
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { Summary } from '@/components';
import { Avatar } from '@mui/material';

test('when clicking summary body callback function is called', async () => {
    const onClick = jest.fn();
    render(<Summary primaryText='Gonzalo Hernandez' onClick={onClick} />);

    const summaryBody = screen.getByText('Gonzalo Hernandez');

    await userEvent.click(summaryBody);
    expect(onClick).toHaveBeenCalled();
});

test('when clicking summary image callback function is called', async () => {
    const onClick = jest.fn();
    render(<Summary avatar={<Avatar>G</Avatar>} primaryText='Gonzalo Hernandez' onClick={onClick} />);

    const summaryImage = screen.getByText('G');

    await userEvent.click(summaryImage);
    expect(onClick).toHaveBeenCalled();
});
