// Components
import Title from '@/components/Title';
import RevalidationInput from './components/RevalidationInput';
import { Form, Input, PasswordInput } from '@/components';

// Hooks
import { useAuth } from '@/hooks';

// Mui
import { Typography } from '@mui/material';

export default function Signup() {
    const { error, signup } = useAuth();

    const handleSubmit = values => {
        signup(values);
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
