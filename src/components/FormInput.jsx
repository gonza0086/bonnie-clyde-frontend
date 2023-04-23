// Hooks
import { useState } from 'react';

// Mui
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import HelpIcon from '@mui/icons-material/Help';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Styles
import styles from '../styles/FormInput.module.css';

export default function FormInput({ id, required, updateValue, type = 'text' }) {
    const [inputValue, setInputValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isInitialState, setIsInitialState] = useState(true);
    const [valueIsValid, setValueIsValid] = useState(!required);
    const [errorMessage, setErrorMessage] = useState(required ? `${id} is empty!` : '');
    const label = id.charAt(0).toUpperCase() + id.slice(1);

    const handleChange = e => {
        setInputValue(e.target.value);
        isValid(e.target.value);
    };

    const handleBlur = () => {
        setIsInitialState(false);
    };

    const handleShowPassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    const isValid = value => {
        let isValid = true;
        let message = '';

        if (value === '') {
            if (required) {
                isValid = false;
                message = `${id} is empty!`;
            }
        } else if (type === 'text') {
            isValid = true;
            message = '';
        } else if (type === 'email') {
            isValid = value.match(/.+@\w+(\.com)$/g) !== null;
            message = value.match(/.+@\w+(\.com)$/g) !== null ? '' : 'that is not a valid email!';
        } else if (type === 'password') {
            if (value.length < 8 || !/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value)) {
                isValid = false;
                message = 'password is not valid!';
            } else {
                isValid = true;
                message = '';
            }
        }

        setValueIsValid(isValid);
        setErrorMessage(message);
        updateValue(id, value, isValid);
    };

    return (
        <div className={styles.inputContainer}>
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
                InputProps={{
                    endAdornment: type === 'password' && (
                        <InputAdornment position='end'>
                            <IconButton onClick={handleShowPassword} edge='end'>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            {type === 'password' && (
                <Tooltip
                    title={
                        <div className={styles.tooltip}>
                            <p className={styles.paragraph}>Password should include at least:</p>
                            <li>8 characters</li>
                            <li>1 capital letter</li>
                            <li>1 number</li>
                        </div>
                    }
                    placement='right'
                    arrow
                >
                    <HelpIcon sx={{ color: grey[500] }} className={styles.icon} />
                </Tooltip>
            )}
        </div>
    );
}
