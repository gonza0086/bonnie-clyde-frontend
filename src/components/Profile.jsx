// Components
import Title from './Title';

// Mui
import { Avatar, Divider, Stack, Typography } from '@mui/material';
import { green } from '@mui/material/colors';

export default function Profile() {
    return (
        <>
            <Stack direction='row' gap={2} style={{ alignItems: 'end' }}>
                <Avatar sx={{ bgcolor: green[500], width: 92, height: 92 }}>G</Avatar>
                <Title>Gonzalo Hernandez</Title>
            </Stack>

            <div style={{ paddingBlock: '0.2rem' }} />
            <Divider />
            <div style={{ paddingBlock: '0.5rem' }} />

            <Typography>Sex: Male</Typography>
            <Typography>Country: Argentina</Typography>
            <Typography>Birthday: August 12 2000</Typography>
        </>
    );
}
