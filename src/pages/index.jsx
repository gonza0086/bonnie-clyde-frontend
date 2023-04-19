// Components
import Title from '@/components/Title';

// Mui
import { Button, TextField } from '@mui/material';

// Styles
import styles from './styles/Home.module.css';

export default function Home() {
    return (
        <div className={styles['form-container']}>
            <form className='form'>
                <Title>Register</Title>
                <TextField id='username' className='text-input' color='secondary' label='Username' variant='outlined' fullWidth />
                <TextField id='email' className='text-input' color='secondary' label='Email' variant='outlined' fullWidth />

                <TextField
                    id='password'
                    className='text-input'
                    color='secondary'
                    label='Password'
                    variant='outlined'
                    type='password'
                    fullWidth
                />

                <TextField
                    id='repeat-password'
                    className='text-input'
                    color='secondary'
                    label='Repeat password'
                    variant='outlined'
                    type='password'
                    fullWidth
                />

                <Button className='form-button' variant='contained' color='secondary'>
                    Signup
                </Button>
            </form>
        </div>
    );
}
