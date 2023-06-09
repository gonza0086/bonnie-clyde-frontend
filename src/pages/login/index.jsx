// Components
import Title from '@/components/Title';
import { Form, Input, PasswordInput } from '@/components';

// Next
import { useRouter } from 'next/router';
import { postData } from '@/services/postData';
import { useState } from 'react';
import { Typography } from '@mui/material';

export default function Login() {
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async values => {
        console.log(values);

        try {
            await postData('users/login', values);
            router.push('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='floating-container'>
            <Title variant='title'>Bonnie & Clyde</Title>
            <Form onSubmit={handleSubmit} button='Login'>
                <Input id='email' type='email' required />
                <PasswordInput id='password' required />
            </Form>
            <div style={{ paddingBlock: '2%' }} />
            <Typography color='red'>{error}</Typography>
        </div>
    );
}
