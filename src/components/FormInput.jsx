// Hooks
import { useState } from 'react';

// Mui
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Styles
const styles = {
    input: { marginBlock: '0.3rem' },
};

export default function FormInput({ id, required, type = 'text' }) {
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isInitialState, setIsInitialState] = useState(true);
    const [valueIsValid, setValueIsValid] = useState(!required);
    const label = id.charAt(0).toUpperCase() + id.slice(1);

    const handleChange = e => {
        setInputValue(e.target.value);
    };

    const handleBlur = e => {
        setIsInitialState(false);
        isValid(e.target.value);
    };

    const handleShowPassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
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

    return (
        <TextField
            id={id}
            label={label}
            value={inputValue}
            required={required}
            style={styles.input}
            onChange={handleChange}
            helperText={errorMessage}
            error={!isInitialState && !valueIsValid}
            type={type === 'password' && !showPassword ? 'password' : 'text'}
            color='secondary'
            fullWidth
            inputProps={{
                onBlur: handleBlur,
            }}
            InputProps={{
                endAdornment: type === 'password' && (
                    <InputAdornment position='end'>
                        <IconButton onClick={handleShowPassword} edge='end'>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
}
