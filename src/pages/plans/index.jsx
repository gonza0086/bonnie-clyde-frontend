// Components
import { FileInput, Form, Input, Searchbar, SelectInput, Title } from '@/components';
import { Plan, PlanSummary } from './components/barrels';

// Hooks
import { useState } from 'react';

// Mui
import { Button, List, Stack } from '@mui/material';

// Fake API
const TAGS = ['Dia', 'Noche', 'Restaurant', 'Cine', 'Outdoor', 'Indoor'];

export default function Plans() {
    const [plan, setPlan] = useState({});
    const [plans, setPlans] = useState([
        {
            id: 0,
            title: 'Paseo Jardin Japones',
            location: 'Palermo',
            comments: 'Paseo por el jardin japones y almorzamos sushi!',
            images: [],
            tags: ['Dia', 'Outdoor', 'Restaurant'],
            status: 0,
            createdBy: 'Gonzalo Hernandez',
            stars: 0,
        },
    ]);
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
        setPlans(prevPlans => [...prevPlans, { ...newPlan, status: 0, createdBy: 'BANANA', stars: 0 }]);
        setShowCreatePlan(false);
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

    const handleUpdate = keyValue => {
        setPlan(prevPlan => ({ ...prevPlan, ...keyValue }));
        setPlans(prevPlans =>
            prevPlans.map(prevPlan => {
                if (prevPlan.id === plan.id) return { ...plan, ...keyValue };
                return prevPlan;
            })
        );
    };

    const handleDelete = id => {
        setPlans(prevPlans => prevPlans.filter(prevPlan => prevPlan.id !== id));
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
                    {plans.map((plan, idx) => (
                        <PlanSummary key={idx} plan={plan} onClick={handleSummaryClick} onDelete={handleDelete} />
                    ))}
                </List>

                {showPlan && <Plan plan={plan} onClick={handleClose} onUpdate={handleUpdate} />}
                {showCreatePlan && (
                    <div style={{ width: '30vw' }}>
                        <Title variant='title'>Create Plan</Title>
                        <form onSubmit={handleFormSubmit}>
                            <Input id='title' updateValue={handleValueUpdate} required />
                            <Input id='location' updateValue={handleValueUpdate} />
                            <SelectInput id='tags' options={TAGS} updateValue={handleValueUpdate} />
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
