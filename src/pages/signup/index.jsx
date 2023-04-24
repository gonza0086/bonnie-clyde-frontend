// Components
import Title from '@/components/Title';
import { Form, Input, PasswordInput } from '@/components';

// Styles
import styles from './Signup.module.css';
import RevalidateInput from '@/components/RevalidateInput';

export default function Signup() {
    return (
        <div className={styles['form-container']}>
            <Title>Bonnie & Clyde</Title>
            <Form>
                <Input id='username' required />
                <Input id='email' type='email' required />
                <RevalidateInput id='repeat-password' type='password' required>
                    <PasswordInput id='password' type='password' required helper />
                </RevalidateInput>
            </Form>
        </div>
    );
}
