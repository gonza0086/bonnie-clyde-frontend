// Components
import { Title } from '@/components';

// Mui
import { Avatar, Box, Chip, Divider, IconButton, Rating, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Styles
import styles from '../styles/Plan.module.css';

// Utilities
import { nameToColor, tagToColor } from '@/utilites/selectColorsFromString';

export default function PlanInfo({ plan, onClick, onUpdate }) {
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
                            <Chip key={tag} label={tag} sx={{ backgroundColor: tagToColor(tag) }} />
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

                {plan.location && (
                    <Stack direction='row' gap={1} alignItems='center'>
                        <LocationOnIcon />
                        <Typography>{plan.location}</Typography>
                    </Stack>
                )}

                {plan.comments && (
                    <>
                        <Stack direction='row' gap={1} alignItems='baseline'>
                            <Avatar sx={{ bgcolor: nameToColor(plan.createdBy), color: 'black' }}>
                                {plan.createdBy.charAt(0).toUpperCase()}
                            </Avatar>
                            <Typography>{plan.comments}</Typography>
                        </Stack>
                        <Divider />
                    </>
                )}
            </ul>
        </>
    );
}
