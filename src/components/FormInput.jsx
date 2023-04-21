import { TextField } from '@mui/material';
import { useState } from 'react';

// Styles
const styles = {
    input: { marginBlock: '0.3rem' },
};

export default function FormInput({ id, required, type = 'text' }) {
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isInitialState, setIsInitialState] = useState(true);
    const [valueIsValid, setValueIsValid] = useState(!required);
    const label = id.charAt(0).toUpperCase() + id.slice(1);

    const handleChange = event => {
        setInputValue(event.target.value);
        // validation(prevValue => ({ ...prevValue, [id]: isValid(event.target.value) }));
    };

    const isValid = value => {
        if (value === '') {
            if (required) {
                setValueIsValid(false);
                setErrorMessage(`${id} is empty!`);
            } else {
                setValueIsValid(true);
                setErrorMessage('');
            }
        } else if (type === 'text') {
            setValueIsValid(true);
            setErrorMessage('');
        } else if (type === 'email') {
            setValueIsValid(value.match(/.+@\w+(\.com)$/g) !== null);
            setErrorMessage(value.match(/.+@\w+(\.com)$/g) !== null ? '' : 'that is not a valid email!');
        }
    };

    const handleBlur = e => {
        setIsInitialState(false);
        isValid(e.target.value);
    };

    return (
        <TextField
            id={id}
            type={type}
            label={label}
            value={inputValue}
            required={required}
            style={styles.input}
            onChange={handleChange}
            helperText={errorMessage}
            error={!isInitialState && !valueIsValid}
            color='secondary'
            variant='outlined'
            fullWidth
            inputProps={{
                onBlur: handleBlur,
            }}
        />
    );
}
