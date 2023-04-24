// Hooks
import { useState } from 'react';

// Utils
import { validateInput } from '@/utilites/inputValidations';

// Mui
import { TextField } from '@mui/material';

// Styles
import styles from '../styles/FormInput.module.css';

export default function Input({ id, required, updateValue, type = 'text', inputProps, showPassword }) {
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isInitialState, setIsInitialState] = useState(true);
    const [valueIsValid, setValueIsValid] = useState(!required);
    const label = (id.charAt(0).toUpperCase() + id.slice(1)).replace('-', ' ');

    const handleChange = e => {
        let { isValid } = handleIsValid(e.target.value);
        setInputValue(e.target.value);
        updateValue(id, e.target.value, isValid);
    };

    const handleBlur = e => {
        let { isValid, message } = handleIsValid(e.target.value);
        setIsInitialState(false);
        setValueIsValid(isValid);
        setErrorMessage(message);
    };

    const handleIsValid = value => {
        return validateInput(value, type, required);
    };

    return (
        <TextField
            id={id}
            label={label}
            value={inputValue}
            required={required}
            onChange={handleChange}
            className={styles.input}
            type={showPassword ? 'text' : type}
            error={!isInitialState && !valueIsValid}
            helperText={!isInitialState && errorMessage}
            color='secondary'
            fullWidth
            inputProps={{
                onBlur: handleBlur,
            }}
            InputProps={inputProps}
        />
    );
}
