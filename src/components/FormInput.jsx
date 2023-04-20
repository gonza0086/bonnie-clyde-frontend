import { TextField } from '@mui/material';
import { useState } from 'react';

export default function FormInput({ id, validation }) {
    const [isInitialState, setIsInitialState] = useState(true);
    const [value, setValue] = useState('');
    const [valueIsValid, setValueIsValid] = useState(false);

    const handleChange = event => {
        setValue(event.target.value);
        setValueIsValid(isValid(event.target.value));
        setIsInitialState(false);
        validation(prevValue => ({ ...prevValue, [id]: isValid(event.target.value) }));
    };

    const isValid = value => {
        return value !== '';
    };

    return (
        <TextField
            id={id}
            className='text-input'
            value={value[id]}
            onChange={handleChange}
            required
            error={!isInitialState && !valueIsValid}
            helperText={!isInitialState && !valueIsValid ? `${id} is empty!` : ''}
            color='secondary'
            label={id.charAt(0).toUpperCase() + id.slice(1)}
            variant='outlined'
            fullWidth
        />
    );
}
