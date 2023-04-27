// Components
import Title from '@/components/Title';
import RevalidationInput from './components/RevalidationInput';
import { Form, Input, PasswordInput } from '@/components';

// Next
import { useRouter } from 'next/router';

export default function Signup() {
    const router = useRouter();

    const handleSubmit = values => {
        console.log(values);
        router.push('/partner-finder');
    };

    return (
        <div className='floating-container'>
            <Title>Bonnie & Clyde</Title>
            <Form onSubmit={handleSubmit}>
                <Input id='username' required />
                <Input id='email' type='email' required />
                <RevalidationInput id='password' revalidateId='repeat-password' type='password' required>
                    <PasswordInput helper />
                </RevalidationInput>
            </Form>
        </div>
    );
}
