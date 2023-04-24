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
import styles from '../styles/FormInput.module.css';

export default function RevalidateInput({ children, updateValue }) {
    const id = `repeat-${children.props.id}`;
    const label = `Repeat ${children.props.id}`;

    const [inputValue, setInputValue] = useState('');
    const [revalidateInputValue, setRevalidateInputValue] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [isInitialState, setIsInitialState] = useState(true);
    const [valueIsValid, setValueIsValid] = useState(!children.props.required);
    const [errorMessage, setErrorMessage] = useState(`${id} does not match ${children.props.id}!`);

    const handleChange = e => {
        let { isValid } = handleIsValid(e.target.value);
        setRevalidateInputValue(e.target.value);
        updateValue(id, e.target.value, isValid);
    };

    const handleBlur = e => {
        let { isValid, message } = handleIsValid(e.target.value, inputValue);
        setIsInitialState(false);
        setValueIsValid(isValid);
        setErrorMessage(message);
    };

    const handleShowPassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    const handleIsValid = (value, revalidate) => {
        return revalidateValue(children.props.id, value, revalidate);
    };

    const handleValueUpdate = (id, newValue, isValueValid) => {
        let { isValid, message } = handleIsValid(revalidateInputValue, newValue);
        setValueIsValid(isValid);
        setErrorMessage(message);
        setInputValue(newValue);
        updateValue(children.props.id, newValue, isValueValid);
        updateValue(id, revalidateInputValue, isValid);
    };

    return (
        <>
            {cloneElement(children, { updateValue: handleValueUpdate })}
            <div className={styles.inputContainer}>
                <TextField
                    id={`repeat-${children.props.id}`}
                    label={label}
                    value={revalidateInputValue}
                    required={children.props.required}
                    onChange={handleChange}
                    className={styles.input}
                    type={showPassword ? 'text' : children.props.type}
                    error={!isInitialState && !valueIsValid}
                    helperText={!isInitialState && errorMessage}
                    color='secondary'
                    fullWidth
                    inputProps={{
                        onBlur: handleBlur,
                    }}
                    InputProps={{
                        endAdornment: children.props.type === 'password' && (
                            <InputAdornment position='end'>
                                <IconButton onClick={handleShowPassword} edge='end'>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {children.props.helper && children.props.type === 'password' && (
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
