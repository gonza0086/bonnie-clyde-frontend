// Hooks
import { useState } from 'react';

// Utils
import { validateEmail, validatePassword, validateRequired, validateText } from '@/utilites/inputValidations';

// Mui
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import HelpIcon from '@mui/icons-material/Help';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Styles
import styles from '../styles/FormInput.module.css';

// Objects
const VALIDATOR = {
    text: validateText,
    email: validateEmail,
    password: validatePassword,
};

export default function FormInput({ id, required, updateValue, type = 'text' }) {
    const [inputValue, setInputValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isInitialState, setIsInitialState] = useState(true);
    const [valueIsValid, setValueIsValid] = useState(!required);
    const [errorMessage, setErrorMessage] = useState('');
    const label = id.charAt(0).toUpperCase() + id.slice(1);
    const validator = VALIDATOR[type];

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

    const handleShowPassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    const handleIsValid = value => {
        let validation = { isValid: true, message: '' };

        if (value !== '') {
            validation = validator(value);
        } else if (required) {
            validation = { isValid: false, message: `${id} is empty!` };
        }

        return validation;
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
