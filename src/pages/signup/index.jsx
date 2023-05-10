// Components
import Title from '@/components/Title';
import RevalidationInput from './components/RevalidationInput';
import { Form, Input, PasswordInput } from '@/components';

// Hooks
import { useState } from 'react';

// Next
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';

const createUser = async user => {
    let response = await fetch('http://localhost:8080/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    let json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.id;
};

export default function Signup() {
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async values => {
        delete values['repeat-password'];
        try {
            let id = await createUser(values);
            // METER REDUX PARA STOREAR USER
            router.push('/finder');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='container floating-container'>
            <Title variant='title'>Bonnie & Clyde</Title>
            <Form onSubmit={handleSubmit} button='Signup'>
                <Input id='first-name' required />
                <Input id='last-name' required />
                <Input id='email' type='email' required />
                <RevalidationInput id='password' revalidateId='repeat-password' type='password' required>
                    <PasswordInput helper />
                </RevalidationInput>
            </Form>
            <Typography color='red'>{error}</Typography>
        </div>
    );
}
