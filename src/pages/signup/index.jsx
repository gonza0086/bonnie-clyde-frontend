// Components
import Title from '@/components/Title';
import { Form, FormInput } from '@/components';

// Styles
import styles from './Signup.module.css';

export default function Signup() {
    return (
        <div className={styles['form-container']}>
            <Title>Bonnie & Clyde</Title>
            <Form>
                <FormInput id='username' required />
                <FormInput id='email' type='email' required />
                <FormInput id='password' type='password' required />
                <FormInput id='repeat-password' type='password' required />
            </Form>
        </div>
    );
}
