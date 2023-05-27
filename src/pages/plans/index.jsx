// Components
import { FileInput, Form, Input, Searchbar, Title } from '@/components';
import { Plan, PlanSummary } from './components/barrels';

// Hooks
import { useState } from 'react';

// Mui
import { Box, Button, Chip, FormControl, InputLabel, List, MenuItem, OutlinedInput, Select, Stack } from '@mui/material';

// Fake API
const TAGS = ['Dia', 'Noche', 'Restaurant', 'Cine', 'Outdoor', 'Indoor'];

export default function Plans() {
    const [plan, setPlan] = useState({});
    const [plans, setPlans] = useState([]);
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
                    {plans.map(plan => (
                        <PlanSummary key={plan.id} plan={plan} onClick={handleSummaryClick}></PlanSummary>
                    ))}
                </List>

                {showPlan && <Plan plan={plan} onClick={handleClose} />}
                {showCreatePlan && (
                    <div>
                        <Title variant='title'>Create Plan</Title>
                        <form>
                            <Input id='title' />
                            <Input id='location' />
                            <Input id='comments' multiline />
                            <FileInput />
                        </form>
                    </div>
                )}
            </Stack>
        </div>
    );
}
