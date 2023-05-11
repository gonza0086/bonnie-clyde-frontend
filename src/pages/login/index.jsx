// Components
import Title from '@/components/Title';
import { Form, Input, PasswordInput } from '@/components';

// Next
import { useRouter } from 'next/router';

export default function Login() {
    const router = useRouter();

    const handleSubmit = values => {
        console.log(values);
        router.push('/');
    };

    return (
        <div className='floating-container'>
            <Title variant='title'>Bonnie & Clyde</Title>
            <Form onSubmit={handleSubmit} button='Login'>
                <Input id='username' required />
                <PasswordInput id='password' required />
            </Form>
        </div>
    );
}
