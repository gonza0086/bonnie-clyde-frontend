// Components
import Title from '@/components/Title';
import { Form, FormInput } from '@/components';

// Styles
import styles from './Signup.module.css';
import RevalidateInput from '@/components/RevalidateInput';

export default function Signup() {
    return (
        <div className={styles['form-container']}>
            <Title>Bonnie & Clyde</Title>
            <Form>
                <FormInput id='username' required />
                <FormInput id='email' type='email' required />
                <RevalidateInput id='repeat-password' type='password' required>
                    <FormInput id='password' type='password' required />
                </RevalidateInput>
            </Form>
        </div>
    );
}
