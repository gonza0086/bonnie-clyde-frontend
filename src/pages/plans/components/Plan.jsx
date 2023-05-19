// Components
import { Title } from '@/components';

// Mui
import { Chip, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Plan({ plan, onClick }) {
    return (
        <div>
            <Stack direction='row' gap={2} style={{ alignItems: 'end' }}>
                <Title variant='title'>{plan.name + ' Details'}</Title>
                <IconButton onClick={onClick} style={{ alignSelf: 'baseline' }}>
                    <CloseIcon />
                </IconButton>
            </Stack>

            <Stack direction='row'>
                <Typography>Tags:</Typography>
                <>
                    {plan.tags.map(tag => (
                        <Chip key={tag.label} label={tag.label} color={tag.color} />
                    ))}
                </>
            </Stack>

            <Typography>{`Status: ${plan.status}`}</Typography>
            <Typography>{`Created by: ${plan.createdBy}`}</Typography>
        </div>
    );
}
