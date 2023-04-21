// Components
import Title from '@/components/Title';
import { FormInput } from '@/components';

// Hooks
import { useState } from 'react';

// Mui
import { Button } from '@mui/material';

// Styles
import styles from './Signup.module.css';

export default function Signup() {
    const [isValid, setIsValid] = useState({
        username: false,
    });

    const isDisabled = () => {
        return Object.values(isValid).includes(false);
    };

    return (
        <div className={styles['form-container']}>
            <form className='form'>
                <Title>Bonnie & Clyde</Title>
                <FormInput id='email' validation={setIsValid} type='email' />
                <Button className='form-button' variant='contained' color='secondary' disabled={isDisabled()}>
                    Signup
                </Button>
            </form>
        </div>
    );
}
