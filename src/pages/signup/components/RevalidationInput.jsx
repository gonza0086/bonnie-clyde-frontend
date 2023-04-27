// Hooks
import { cloneElement, useState } from 'react';

// Utils
import { revalidateValue } from '@/utilites/inputValidations';

// Mui
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import HelpIcon from '@mui/icons-material/Help';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Styles
import styles from '@/styles/FormInput.module.css';

export default function RevalidationInput({ id, children, updateValue, type, required }) {
    const revalidateId = `repeat-${id}`;
    const label = `Repeat ${id}`;
    const [inputValue, setInputValue] = useState('');
    const [revalidateInputValue, setRevalidateInputValue] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [isInitialState, setIsInitialState] = useState(true);
    const [valueIsValid, setValueIsValid] = useState(!required);
    const [errorMessage, setErrorMessage] = useState(`${revalidateId} does not match ${id}!`);

    const handleChange = e => {
        let { isValid } = handleIsValid(inputValue, e.target.value);
        setRevalidateInputValue(e.target.value);
        updateValue(revalidateId, e.target.value, isValid);
    };

    const handleBlur = e => {
        let { isValid, message } = handleIsValid(inputValue, e.target.value);
        setIsInitialState(false);
        setValueIsValid(isValid);
        setErrorMessage(message);
    };

    const handleShowPassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    const handleIsValid = (value, revalidate) => {
        return revalidateValue(id, value, revalidate);
    };

    const handleValueUpdate = (id, newValue, isValueValid) => {
        let { isValid, message } = handleIsValid(revalidateInputValue, newValue);
        setValueIsValid(isValid);
        setErrorMessage(message);
        setInputValue(newValue);
        updateValue(id, newValue, isValueValid);
        updateValue(revalidateId, revalidateInputValue, isValid);
    };

    return (
        <>
            {cloneElement(children, { id, required, type, updateValue: handleValueUpdate })}
            <div className={styles.inputContainer}>
                <TextField
                    id={revalidateId}
                    label={label}
                    value={revalidateInputValue}
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
                {children.props.helper && type === 'password' && (
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
        </>
    );
}
