// Components
import Title from './Title';

// Mui
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { green } from '@mui/material/colors';

// Styles
import styles from '@/styles/ProfileSummary.module.css';

export default function ProfileSummary({ user, onClick, onSubmit }) {
    const handleClick = () => {
        onClick(user);
    };

    const handleSubmit = () => {
        onSubmit(user.id);
    };

    return (
        <Stack direction='row' gap={2} className={styles.container}>
            <Avatar
                className={styles.avatar}
                alt={`${user.id}_logo`}
                sx={{ bgcolor: green[500], width: 60, height: 60 }}
                onClick={handleClick}
            >
                {user.name.charAt(0).toUpperCase()}
            </Avatar>

            <div className={styles.body} onClick={handleClick}>
                <Title tag='h6'>{user.name}</Title>
                <Typography className={styles.typography}>{`${user.country} | ${user.sex}`}</Typography>
            </div>

            <Button color='secondary' variant='contained' className={styles.button} onClick={handleSubmit}>
                Match
            </Button>
        </Stack>
    );
}
