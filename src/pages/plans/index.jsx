// Components
import { FileInput, Form, Input, Searchbar, SelectInput, Title } from '@/components';
import { Plan, PlanInfo, PlanSummary } from './components/barrels';

// Hooks
import { useState } from 'react';

// Mui
import { Button, Card, Dialog, DialogContent, List, MenuItem, Pagination, Stack } from '@mui/material';

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
    status: '',
    'created-by': '',
    tags: [],
    location: '',
};

// Fake API

export default function Plans({ data = [] }) {
    const [plan, setPlan] = useState({});
    const [plans, setPlans] = useState(data);
    const [shownPlansIndex, setShownPlansIndex] = useState({ first: 0, last: 7 });
    const [showPlan, setShowPlan] = useState(false);
    const [showCreatePlan, setShowCreatePlan] = useState(false);
    const [randomPlan, setRandomPlan] = useState({});
    const [showRandomPlan, setShowRandomPlan] = useState(false);
    const [filterFormValues, setFilterFormValues] = useState(initialFilterObject);
    const [showFilterForm, setShowFilterForm] = useState(false);
    const { info } = useSelector(state => state.user);

    const handleFormSubmit = newPlan => {
        setPlans(prevPlans => [...prevPlans, { ...newPlan, status: 0, createdBy: `${info.firstName} ${info.lastName}`, stars: 0 }]);
        setShowCreatePlan(false);
    };

    const handleFormClose = () => {
        setShowCreatePlan(false);
    };

    const handleSearch = search => {
        setPlans(data.filter(prevPlan => prevPlan.title.includes(search)));
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
            data.filter(
                prevPlan =>
                    prevPlan.title.includes(values.title) &&
                    (prevPlan.status === values.status || values.status === '') &&
                    prevPlan.createdBy.includes(values['created-by']) &&
                    values.tags.every(tag => prevPlan.tags.includes(tag)) &&
                    prevPlan.location.includes(values.location)
            )
        );
        setFilterFormValues(values);
        setShowFilterForm(false);
    };

    const handlePagination = (event, page) => {
        console.log(page);
        setShownPlansIndex({ first: (page - 1) * 7, last: page * 7 });
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
                <div style={{ width: '40%', height: '65vh', position: 'relative' }}>
                    <List>
                        {plans.slice(shownPlansIndex.first, shownPlansIndex.last).map((plan, idx) => (
                            <PlanSummary key={idx} plan={plan} onClick={handleSummaryClick} onDelete={handleDelete} />
                        ))}
                    </List>
                    <Pagination
                        count={Math.floor(plans.length / 8) + 1}
                        variant='outlined'
                        shape='rounded'
                        color='secondary'
                        sx={{ position: 'absolute', bottom: 0, right: 0 }}
                        onChange={handlePagination}
                    />
                </div>
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
                        <Input id='status' initialValue={filterFormValues.status} select>
                            <MenuItem key={1} value={1}>
                                Completed
                            </MenuItem>
                            <MenuItem key={0} value={0}>
                                Pending
                            </MenuItem>
                            <MenuItem key={2} value={''}>
                                Any
                            </MenuItem>
                        </Input>
                        <Input id='created-by' initialValue={filterFormValues['created-by']} />
                        <SelectInput id='tags' options={TAGS} initialValue={filterFormValues.tags} />
                        <Input id='location' initialValue={filterFormValues.location} />
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
