// Components
import Title from '@/components/Title';
import RevalidationInput from './components/RevalidationInput';
import { Form, Input, PasswordInput } from '@/components';

// Hooks
import { useState } from 'react';

// Next
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { postData } from '@/services/postData';

export default function Signup() {
    const [error, setError] = useState('');
    const router = useRouter();

    const createUser = async user => {
        try {
            let response = await postData('users/signup', user);
            console.log(response);
            // METER REDUX PARA STOREAR USER
            router.push('/finder');
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    const handleSubmit = async values => {
        delete values['repeat-password'];
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
