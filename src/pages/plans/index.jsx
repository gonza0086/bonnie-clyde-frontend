// Components
import { FileInput, Form, Input, Searchbar, SelectInput, Title } from '@/components';
import { Plan, PlanSummary } from './components/barrels';

// Hooks
import { useState } from 'react';

// Mui
import { Button, Card, List, Stack } from '@mui/material';

// Styles
import styles from './styles/Plan.module.css';
import { useSelector } from 'react-redux';

// Object
const TAGS = ['Dia', 'Noche', 'Restaurant', 'Cine', 'Outdoor', 'Indoor'];
const initialNewObject = {
    title: '',
    location: '',
    comments: '',
    images: [],
    tags: [],
};

// Fake API
const PLAN = {
    id: 0,
    title: 'Paseo Jardin Japones',
    location: 'Palermo',
    comments: 'Paseo por el jardin japones y almorzamos sushi!',
    images: [],
    tags: ['Dia', 'Outdoor', 'Restaurant'],
    status: 0,
    createdBy: 'Gonzalo Hernandez',
    stars: 0,
};

export default function Plans() {
    const [plan, setPlan] = useState({});
    const [plans, setPlans] = useState([PLAN]);
    const [showPlan, setShowPlan] = useState(false);
    const [showCreatePlan, setShowCreatePlan] = useState(false);
    const { data } = useSelector(state => state.user);

    const handleFormSubmit = newPlan => {
        // setPlans(prevPlans => [...prevPlans, { ...newPlan, status: 0, createdBy: `${data.firstName} ${data.lastName}`, stars: 0 }]);
        setPlans(prevPlans => [...prevPlans, { ...newPlan, status: 0, createdBy: 'BANANA', stars: 0 }]);
        setShowCreatePlan(false);
    };

    const handleFormClose = () => {
        setShowCreatePlan(false);
    };

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
        setShowPlan(false);
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
                    <Card className={styles.card}>
                        <Title variant='title'>Create Plan</Title>
                        <Form
                            onSubmit={handleFormSubmit}
                            onCancel={handleFormClose}
                            initialValues={initialNewObject}
                            button='Create'
                            justifyContent='right'
                            divider
                        >
                            <Input id='title' required />
                            <Input id='location' />
                            <SelectInput id='tags' options={TAGS} />
                            <Input id='comments' multiline />
                            <FileInput id='images' />
                        </Form>
                    </Card>
                )}
            </Stack>
        </div>
    );
}
