// Components
import Title from '@/components/Title';

// Hooks
import { useState } from 'react';

// Mui
import { Button, TextField } from '@mui/material';

// Styles
import styles from './Signup.module.css';
import { FormInput } from '@/components';

export default function Signup() {
    const [isValid, setIsValid] = useState({
        username: false,
    });

    const isDisabled = () => {
        console.log(isValid);
        return Object.values(isValid).includes(false);
    };

    return (
        <div className={styles['form-container']}>
            <form className='form'>
                <Title>Bonnie & Clyde</Title>
                <FormInput id='username' validation={setIsValid} />
                <Button className='form-button' variant='contained' color='secondary' disabled={isDisabled()}>
                    Signup
                </Button>
            </form>
        </div>
    );
}
