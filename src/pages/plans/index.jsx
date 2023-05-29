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

    //
    // Start Form Stuff
    //

    const [newPlan, setNewPlan] = useState({
        title: '',
        location: '',
        comments: '',
        images: [],
        tags: [],
    });

    const [isValid, setIsValid] = useState({
        title: false,
        location: true,
        comments: true,
        images: true,
        tags: true,
    });

    const handleValueUpdate = (id, newValue, isValueValid) => {
        setNewPlan(prevValues => ({ ...prevValues, [id]: newValue }));
        setIsValid(prevIsValid => ({ ...prevIsValid, [id]: isValueValid }));
    };

    const handleFormSubmit = e => {
        e.preventDefault();
        console.log(newPlan);
    };

    const handleFormClose = () => {
        setNewPlan({
            title: '',
            location: '',
            comments: '',
            images: [],
            tags: [],
        });
        setIsValid({
            title: false,
            location: true,
            comments: true,
            images: true,
            tags: true,
        });
        setShowCreatePlan(false);
    };

    const isDisabled = () => {
        return Object.values(isValid).includes(false);
    };

    //
    // End Form Stuff
    //

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
                    <div className='container' style={{ height: '50vh' }}>
                        <Title variant='title'>Create Plan</Title>
                        <form className='form' onSubmit={handleFormSubmit}>
                            <Input id='title' updateValue={handleValueUpdate} required />
                            <Input id='location' updateValue={handleValueUpdate} />
                            <Input id='comments' multiline updateValue={handleValueUpdate} />
                            <FileInput id='images' updateValue={handleValueUpdate} />

                            <div style={{ float: 'right', gap: '5%', display: 'flex' }}>
                                <Button className='form-button' variant='contained' color='cancel' onClick={handleFormClose}>
                                    Cancel
                                </Button>

                                <Button className='form-button' type='submit' variant='contained' color='secondary' disabled={isDisabled()}>
                                    Create
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
            </Stack>
        </div>
    );
}
