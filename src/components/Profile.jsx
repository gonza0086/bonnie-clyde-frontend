// Components
import Title from './Title';

// Mui
import { Avatar, Divider, IconButton, Stack, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';

export default function Profile({ user, onClose }) {
    const handleClick = () => {
        onClose();
    };

    return (
        <>
            <Stack direction='row' gap={2} style={{ alignItems: 'end' }}>
                <Avatar sx={{ bgcolor: green[500], width: 92, height: 92 }}>{user.name.charAt(0).toUpperCase()}</Avatar>
                <Title>{user.name}</Title>
                <IconButton onClick={handleClick} style={{ alignSelf: 'baseline' }}>
                    <CloseIcon />
                </IconButton>
            </Stack>

            <div style={{ paddingBlock: '0.2rem' }} />
            <Divider />
            <div style={{ paddingBlock: '0.5rem' }} />

            <Typography>{`Sex: ${user.sex}`}</Typography>
            <Typography>{`Country: ${user.country}`}</Typography>
            <Typography>{`Birthday: ${user.birdthday}`}</Typography>
        </>
    );
}
