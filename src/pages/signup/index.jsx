// Components
import Title from '@/components/Title';
import { Form, Input, PasswordInput } from '@/components';

// Styles
import styles from './Signup.module.css';
import RevalidateInput from '@/components/RevalidateInput';

export default function Signup() {
    const handleSubmit = values => {
        console.log(values);
    };

    return (
        <div className={styles['form-container']}>
            <Title>Bonnie & Clyde</Title>
            <Form onSubmit={handleSubmit}>
                <Input id='username' required />
                <Input id='email' type='email' required />
                <RevalidateInput id='repeat-password'>
                    <PasswordInput id='password' type='password' required helper />
                </RevalidateInput>
            </Form>
        </div>
    );
}
