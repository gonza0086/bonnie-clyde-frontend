// Components
import Title from '@/components/Title';
import { Form, Input, PasswordInput } from '@/components';

// Mui
import { Typography } from '@mui/material';

// Hooks
import { useAuth } from '@/hooks';

export default function Login() {
    const { loginUser, error } = useAuth();

    const handleSubmit = async values => {
        loginUser(values);
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
