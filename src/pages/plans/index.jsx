// Components
import { Form, Input, Searchbar, Title } from '@/components';
import { Plan, PlanSummary } from './components/barrels';

// Hooks
import { useState } from 'react';

// Mui
import { Button, List, Stack } from '@mui/material';

// Fake API
const testPlan = [
    {
        id: 0,
        name: 'Paseo Jardin Japones',
        createdBy: 'Gonzalo Hernandez',
        color: 'success',
        status: 'Done',
        tags: [
            { label: 'Dia', color: 'secondary' },
            { label: 'Paseo', color: 'primary' },
        ],
    },
];

export default function Plans() {
    const [plan, setPlan] = useState({});
    const [showPlan, setShowPlan] = useState(false);
    const [showCreatePlan, setShowCreatePlan] = useState(false);

    const handleSearch = search => {
        console.log(search);
    };

    const handleSummaryClick = plan => {
        setPlan(plan);
        setShowCreatePlan(false);
        setShowPlan(true);
    };

    const handleClose = () => {
        setShowPlan(false);
        setPlan({});
    };

    const handleNew = () => {
        setShowPlan(false);
        setShowCreatePlan(true);
    };

    const handleNewSubmit = values => {
        console.log(values);
    };

    const handleCloseForm = () => {
        setShowCreatePlan(false);
    };

    return (
        <div className='container'>
            <Title variant='title'>Plans to do</Title>

            <Stack direction='row' gap={2}>
                <Searchbar onSearch={handleSearch} />
                <Button sx={{ display: 'inline-block' }} variant='contained' color='secondary' onClick={handleNew}>
                    New Plan
                </Button>
            </Stack>

            <Stack direction='row' gap={64}>
                <List sx={{ width: '40%' }}>
                    {testPlan.map(plan => (
                        <PlanSummary key={plan.id} plan={plan} onClick={handleSummaryClick}></PlanSummary>
                    ))}
                </List>

                {showPlan && <Plan plan={plan} onClick={handleClose} />}
                {showCreatePlan && (
                    <div>
                        <Title variant='title'>Create Plan</Title>
                        <Form button='Create' cancel onCancel={handleCloseForm} onSubmit={handleNewSubmit}>
                            <Input id='name' />
                            <Input id='tags' />
                        </Form>
                    </div>
                )}
            </Stack>
        </div>
    );
}
