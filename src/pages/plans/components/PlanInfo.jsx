import { Title } from '@/components';
import { Avatar, Box, Chip, Divider, IconButton, Rating, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import styles from '../styles/Plan.module.css';

export default function PlanInfo({ plan, onClick }) {
    return (
        <>
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
        </>
    );
}
