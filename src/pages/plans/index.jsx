// Components
import { Searchbar, Title } from '@/components';
import PlanSummary from './components/PlanSummary';

// Hooks
import { useState } from 'react';

// Mui
import { IconButton, List, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
    const [plan, setPlan] = useState({});
    const [showPlan, setShowPlan] = useState(false);

    const handleSearch = search => {
        console.log(search);
    };

    const handleSummaryClick = plan => {
        setPlan(plan);
        setShowPlan(true);
    };

    const handleClose = () => {
        setShowPlan(false);
        setPlan({});
    };

    return (
        <div className='container'>
            <Title variant='title'>Plans to do</Title>
            <Searchbar onSearch={handleSearch} />

            <Stack direction='row' justifyContent='space-between'>
                <List sx={{ width: '40%' }}>
                    {testPlan.map(plan => (
                        <PlanSummary key={plan.id} plan={plan} onClick={handleSummaryClick}></PlanSummary>
                    ))}
                </List>

                {showPlan && (
                    <div>
                        <IconButton onClick={handleClose} style={{ float: 'right' }}>
                            <CloseIcon />
                        </IconButton>
                        <Title>{plan.name + ' Details'}</Title>
                    </div>
                )}
            </Stack>
        </div>
    );
}
