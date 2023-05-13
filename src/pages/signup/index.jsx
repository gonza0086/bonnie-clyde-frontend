// Components
import Title from '@/components/Title';
import RevalidationInput from './components/RevalidationInput';
import { Form, Input, PasswordInput } from '@/components';

// Hooks
import { useState } from 'react';

// Next
import { useRouter } from 'next/router';

// Mui
import { Typography } from '@mui/material';

// Services
import { postData } from '@/services/postData';

// Adapters
import { createAdaptedUser } from './adapters/signup.adapter';

// Redux
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/userSlice';

export default function Signup() {
    const [error, setError] = useState('');
    const router = useRouter();
    const dispatch = useDispatch();

    const createUser = async user => {
        const adaptedUser = createAdaptedUser(user);
        try {
            await postData('users/signup', adaptedUser);
            dispatch(login(adaptedUser));
            router.push('/');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = values => {
        createUser(values);
    };

    return (
        <div className='floating-container'>
            <Title variant='title'>Bonnie & Clyde</Title>
            <Form onSubmit={handleSubmit} button='Signup'>
                <Input id='first-name' required style={{ width: '49%', marginRight: '2%' }} />
                <Input id='last-name' required style={{ width: '49%' }} />
                <Input id='email' type='email' required />
                <RevalidationInput id='password' revalidateId='repeat-password' type='password' required>
                    <PasswordInput helper />
                </RevalidationInput>
            </Form>
            <div style={{ paddingBlock: '2%' }} />
            <Typography color='red'>{error}</Typography>
        </div>
    );
}
