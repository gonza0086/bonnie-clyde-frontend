// Components
import Title from '@/components/Title';
import { Form, Input, PasswordInput, RevalidationInput } from '@/components';

// Styles
import styles from './Signup.module.css';

export default function Signup() {
    const handleSubmit = values => {
        console.log(values);
    };

    return (
        <>
            <div className={styles['form-container']}>
                <Title>Bonnie & Clyde</Title>
                <Form onSubmit={handleSubmit}>
                    <Input id='username' required />
                    <Input id='email' type='email' required />
                    <RevalidationInput id='password' revalidateId='repeat-password' type='password' required>
                        <PasswordInput helper />
                    </RevalidationInput>
                </Form>
            </div>
        </>
    );
}
