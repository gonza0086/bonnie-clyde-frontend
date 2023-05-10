import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import PlanSummary from '../components/PlanSummary';

const plan = {
    id: 0,
    name: 'Paseo Jardin Japones',
    createdBy: 'Gonzalo Hernandez',
    color: 'success',
    tags: [
        { label: 'Dia', color: 'secondary' },
        { label: 'Paseo', color: 'primary' },
    ],
};

test('when clicking plan summary callback function is called', async () => {
    const onClick = jest.fn();
    render(<PlanSummary plan={plan} onClick={onClick} />);

    const summaryBody = screen.getByText('Paseo Jardin Japones');

    await userEvent.click(summaryBody);
    expect(onClick).toHaveBeenCalledWith(plan);
});
