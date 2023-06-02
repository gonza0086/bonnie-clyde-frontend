// Components
import { FileInput, Form, Input, SelectInput, Title } from '@/components';

// Hooks
import { useState } from 'react';

// Mui
import { Chip, IconButton, Stack, Box, Typography, Avatar, Card, Divider, Rating, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Styles
import styles from '../styles/Plan.module.css';

// Objects
const TAGS = ['Dia', 'Noche', 'Restaurant', 'Cine', 'Outdoor', 'Indoor'];

export default function Plan({ plan, onClick, onUpdate }) {
    const [showEdit, setShowEdit] = useState(false);

    const handleFormSubmit = editedPlan => {
        console.log(editedPlan);
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
        <Card className={styles.card}>
            <Stack direction='row' gap={2} alignItems='end' justifyContent='space-between'>
                <Title>{plan.title}</Title>
                <IconButton onClick={onClick} style={{ alignSelf: 'baseline' }}>
                    <CloseIcon />
                </IconButton>
            </Stack>
            <Divider style={{ marginBottom: '1rem' }} />

            <ul className={styles.list}>
                <Stack direction='row' justifyContent='space-between'>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {plan.tags.map(tag => (
                            <Chip key={tag} label={tag} />
                        ))}
                    </Box>

                    <Rating
                        name='rating'
                        defaultValue={plan.stars}
                        precision={0.5}
                        size='large'
                        onClick={e => onUpdate({ stars: e.target.value })}
                    />
                </Stack>

                <Stack direction='row' gap={1} alignItems='center'>
                    <LocationOnIcon />
                    <Typography>{plan.location}</Typography>
                </Stack>

                <Stack direction='row' gap={1} alignItems='baseline'>
                    <Avatar sx={{ bgcolor: '#f1ff59', color: 'black' }}>{plan.createdBy.charAt(0).toUpperCase()}</Avatar>
                    <Typography>{plan.comments}</Typography>
                </Stack>
                <Divider />
            </ul>

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
        </Card>
    );
}
