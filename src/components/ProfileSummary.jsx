// Components
import Title from './Title';

// Mui
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { green } from '@mui/material/colors';

// Styles
import styles from '@/styles/Summary.module.css';

export default function ProfileSummary({ user }) {
    return (
        <Stack direction='row' gap={2} className={styles.container}>
            <Avatar sx={{ bgcolor: green[500], width: 60, height: 60 }}>{user.name.charAt(0).toUpperCase()}</Avatar>

            <div style={{ alignSelf: 'center' }}>
                <Title tag='h6'>{user.name}</Title>
                <Typography style={{ lineHeight: 1, color: 'var(--grey-700)' }}>{`${user.country} | ${user.sex}`}</Typography>
            </div>

            <div style={{ paddingInline: '5rem' }} />
            <Button color='secondary' variant='contained' className={styles.button}>
                Match
            </Button>
        </Stack>
    );
}
