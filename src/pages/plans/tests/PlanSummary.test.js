// Testing Library
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import PlanSummary from '../components/PlanSummary';

const plan = {
    id: 0,
    title: 'Paseo Jardin Japones',
    createdBy: 'Gonzalo Hernandez',
    status: 1,
    tags: ['Dia', 'Paseo'],
    comments: '',
};

test('when clicking plan summary callback function is called', async () => {
    const onClick = jest.fn();
    render(<PlanSummary plan={plan} onClick={onClick} />);

    const summaryBody = screen.getByText('Paseo Jardin Japones');

    await userEvent.click(summaryBody);
    expect(onClick).toHaveBeenCalledWith(plan);
});
