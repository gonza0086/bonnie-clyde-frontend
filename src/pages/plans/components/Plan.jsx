// Components
import { FileInput, Form, Input, SelectInput, Title } from '@/components';

// Hooks
import { useState } from 'react';

// Mui
import { Chip, IconButton, Stack, Box, Typography, Avatar, Card, Divider, Rating, Button } from '@mui/material';

// Styles
import styles from '../styles/Plan.module.css';
import { PlanInfo } from './barrels';

// Objects
const TAGS = ['Dia', 'Noche', 'Restaurant', 'Cine', 'Outdoor', 'Indoor'];

export default function Plan({ plan, onClick, onUpdate }) {
    const [showEdit, setShowEdit] = useState(false);

    const handleFormSubmit = editedPlan => {
        onUpdate(editedPlan);
        setShowEdit(false);
    };

    const handleFormClose = () => {
        setShowEdit(false);
    };

    if (showEdit) {
        return (
            <Card className={styles.card}>
                <Title variant='title'>Edit Plan</Title>
                <Form onSubmit={handleFormSubmit} onCancel={handleFormClose} divider button='Edit' justifyContent='rigth'>
                    <Input id='title' initialValue={plan.title} required />
                    <Input id='location' initialValue={plan.location} />
                    <SelectInput id='tags' initialValue={plan.tags} options={TAGS} />
                    <Input id='comments' initialValue={plan.comments} multiline />
                    <FileInput id='images' />
                </Form>
            </Card>
        );
    }

    return (
        <>
            <PlanInfo plan={plan} onClick={onClick} onUpdate={onUpdate} />
            <div className={styles.buttons}>
                <Button variant='contained' color='cancel' onClick={() => setShowEdit(true)}>
                    Edit
                </Button>

                {plan.status === 0 && (
                    <Button variant='contained' color='secondary' onClick={() => onUpdate({ status: 1 })}>
                        Done
                    </Button>
                )}
            </div>
        </>
    );
}
