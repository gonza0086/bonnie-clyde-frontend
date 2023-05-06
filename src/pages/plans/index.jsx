// Components
import { Searchbar, Title } from '@/components';
import PlanSummary from './components/PlanSummary';

// Mui
import { List } from '@mui/material';

// Fake API
const testPlan = [
    {
        id: 0,
        name: 'Paseo Jardin Japones',
        createdBy: 'Gonzalo Hernandez',
        color: 'success',
        tags: [
            { label: 'Dia', color: 'secondary' },
            { label: 'Paseo', color: 'primary' },
        ],
    },
];

export default function Plans() {
    const handleSearch = search => {
        console.log(search);
    };

    const handleSummaryClick = plan => {
        console.log(plan.name);
    };

    return (
        <div className='container'>
            <Title variant='title'>Plans to do</Title>
            <Searchbar onSearch={handleSearch} />

            <List sx={{ width: '40%' }}>
                {testPlan.map(plan => (
                    <PlanSummary key={plan.id} plan={plan} onClick={handleSummaryClick}></PlanSummary>
                ))}
            </List>
        </div>
    );
}
