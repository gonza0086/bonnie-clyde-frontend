// Hooks
import { useState } from 'react';

// Mui
import { IconButton, InputAdornment, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import HelpIcon from '@mui/icons-material/Help';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Styles
import styles from '../styles/FormInput.module.css';
import Input from './Input';

export default function PasswordInput({ id, required, helper, updateValue }) {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    return (
        <div className={styles.inputContainer}>
            <Input
                id={id}
                type='password'
                required={required}
                updateValue={updateValue}
                showPassword={showPassword}
                inputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={handleShowPassword} edge='end'>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            {helper && (
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
