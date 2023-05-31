// Components
import { FileInput, Input, SelectInput, Title } from '@/components';

// Hooks
import { useState } from 'react';

// Mui
import { Chip, IconButton, Stack, Box, Typography, Avatar, Card, Divider, Rating, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Styles
import styles from '../styles/Plan.module.css';

// Fake API
const TAGS = ['Dia', 'Noche', 'Restaurant', 'Cine', 'Outdoor', 'Indoor'];

export default function Plan({ plan, onClick, onUpdate }) {
    const [showEdit, setShowEdit] = useState(false);
    const [planEdited, setPlanEdited] = useState(plan);
    const [isValid, setIsValid] = useState({
        title: true,
        location: true,
        comments: true,
        images: true,
        tags: true,
    });

    const handleValueUpdate = (id, newValue, isValueValid) => {
        setPlanEdited(prevValues => ({ ...prevValues, [id]: newValue }));
        setIsValid(prevIsValid => ({ ...prevIsValid, [id]: isValueValid }));
    };

    const handleFormSubmit = e => {
        e.preventDefault();
        onUpdate(planEdited);
        setShowEdit(false);
    };

    const handleFormClose = () => {
        setPlanEdited(plan);
        setIsValid({
            title: true,
            location: true,
            comments: true,
            images: true,
            tags: true,
        });
        setShowEdit(false);
    };

    const isDisabled = () => {
        return Object.values(isValid).includes(false);
    };

    if (showEdit) {
        return (
            <Card className={styles.card}>
                <Title variant='title'>Edit Plan</Title>
                <form onSubmit={handleFormSubmit}>
                    <Input id='title' initialValue={plan.title} updateValue={handleValueUpdate} required />
                    <Input id='location' initialValue={plan.location} updateValue={handleValueUpdate} />
                    <SelectInput id='tags' initialValue={plan.tags} options={TAGS} updateValue={handleValueUpdate} />
                    <Input id='comments' initialValue={plan.comments} multiline updateValue={handleValueUpdate} />
                    <FileInput id='images' updateValue={handleValueUpdate} />

                    <Divider className={styles.divider} />
                    <div className={styles.buttons}>
                        <Button variant='contained' color='cancel' onClick={handleFormClose}>
                            Cancel
                        </Button>

                        <Button type='submit' variant='contained' color='secondary' disabled={isDisabled()}>
                            Edit
                        </Button>
                    </div>
                </form>
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
