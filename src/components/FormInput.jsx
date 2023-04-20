import { TextField } from '@mui/material';
import { useState } from 'react';

export default function FormInput({ id, validation, required, type = 'text' }) {
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [valueIsValid, setValueIsValid] = useState(false);
    const [isInitialState, setIsInitialState] = useState(true);

    const handleChange = event => {
        setInputValue(event.target.value);
        setIsInitialState(false);
        // validation(prevValue => ({ ...prevValue, [id]: isValid(event.target.value) }));
    };

    const isValid = value => {
        if (value === '') {
            setValueIsValid(false);
            setErrorMessage(`${id} is empty!`);
        } else if (type === 'text') {
            setValueIsValid(true);
            setErrorMessage('');
        } else if (type === 'email') {
            setValueIsValid(value.match(/.+@\w+(\.com)$/g) !== null);
            setErrorMessage(value.match(/.+@\w+(\.com)$/g) !== null ? '' : 'that is not a valid email!');
        }
    };

    return (
        <TextField
            id={id}
            value={inputValue}
            required={required}
            onChange={handleChange}
            inputProps={{
                onBlur: event => isValid(event.target.value),
            }}
            helperText={errorMessage}
            error={!isInitialState && !valueIsValid}
            style={{ marginBlock: '0.3rem' }}
            label={id.charAt(0).toUpperCase() + id.slice(1)}
            color='secondary'
            variant='outlined'
            fullWidth
        />
    );
}
