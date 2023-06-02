// Components
import { FileInput, Form, Input, Searchbar, SelectInput, Title } from '@/components';
import { Plan, PlanInfo, PlanSummary } from './components/barrels';

// Hooks
import { useState } from 'react';

// Mui
import { Button, Card, Dialog, DialogContent, List, Stack } from '@mui/material';

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
const initialFilterObject = {
    title: '',
    'created-by': '',
    tags: [],
    location: '',
};

// Fake API
const PLANS = [
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
    {
        id: 1,
        title: 'Cena Food Truck Store',
        location: 'Palermo',
        comments: 'Vamos a comer el nuevo triplete!',
        images: [],
        tags: ['Noche', 'Restaurant'],
        status: 0,
        createdBy: 'Gonzalo Hernandez',
        stars: 0,
    },
];

export default function Plans({ data = PLANS }) {
    const [plan, setPlan] = useState({});
    const [plans, setPlans] = useState(data);
    const [showPlan, setShowPlan] = useState(false);
    const [showCreatePlan, setShowCreatePlan] = useState(false);
    const [randomPlan, setRandomPlan] = useState({});
    const [showRandomPlan, setShowRandomPlan] = useState(false);
    const [filterFormValues, setFilterFormValues] = useState(initialFilterObject);
    const [showFilterForm, setShowFilterForm] = useState(false);
    const { info } = useSelector(state => state.user);

    const handleFormSubmit = newPlan => {
        // setPlans(prevPlans => [...prevPlans, { ...newPlan, status: 0, createdBy: `${info.firstName} ${info.lastName}`, stars: 0 }]);
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

    const handleRandom = () => {
        const random = Math.floor(Math.random() * plans.length);
        setRandomPlan(plans[random]);
        setShowRandomPlan(true);
    };

    const handleFilterSubmit = values => {
        setPlans(
            PLANS.filter(
                prevPlan =>
                    prevPlan.title.includes(values.title) &&
                    prevPlan.createdBy.includes(values['created-by']) &&
                    values.tags.every(tag => prevPlan.tags.includes(tag)) &&
                    prevPlan.location.includes(values.location)
            )
        );
        setFilterFormValues(values);
        setShowFilterForm(false);
    };

    return (
        <div className='container'>
            <Title variant='title'>Plans to do</Title>

            <Stack direction='row' gap={2}>
                <Searchbar onSearch={handleSearch} />
                <Button variant='contained' color='secondary' onClick={handleNew}>
                    New Plan
                </Button>
                <Button variant='contained' onClick={handleRandom}>
                    Random Plan
                </Button>
                <Button variant='contained' color='cancel' onClick={() => setShowFilterForm(true)}>
                    Filters
                </Button>
            </Stack>

            <Stack direction='row' gap={64}>
                <List sx={{ width: '40%' }}>
                    {plans.map((plan, idx) => (
                        <PlanSummary key={idx} plan={plan} onClick={handleSummaryClick} onDelete={handleDelete} />
                    ))}
                </List>

                {showPlan && (
                    <Card className={styles.card}>
                        <Plan plan={plan} onClick={handleClose} onUpdate={handleUpdate} />
                    </Card>
                )}

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

            <Dialog onClose={() => setShowRandomPlan(false)} open={showRandomPlan}>
                <DialogContent sx={{ padding: '1em' }}>
                    <PlanInfo plan={randomPlan} onClick={() => setShowRandomPlan(false)} />
                </DialogContent>
            </Dialog>

            <Dialog onClose={() => setShowFilterForm(false)} open={showFilterForm}>
                <DialogContent sx={{ padding: '1em' }}>
                    <Form
                        onSubmit={handleFilterSubmit}
                        onCancel={() => setShowFilterForm(false)}
                        initialValues={filterFormValues}
                        button='Apply Filters'
                    >
                        <Input id='title' initialValue={filterFormValues.title} />
                        <Input id='created-by' initialValue={filterFormValues['created-by']} />
                        <SelectInput id='tags' options={TAGS} initialValue={filterFormValues.tags} />
                        <Input id='location' initialValue={filterFormValues.location} />
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
