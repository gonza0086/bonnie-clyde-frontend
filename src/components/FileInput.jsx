// Hooks
import { useState } from 'react';

// Mui
import { Button, Typography } from '@mui/material';

// Styles
import styles from '../styles/Input.module.css';

export default function FileInput({ id, updateValue }) {
    const [photosCount, setPhotosCount] = useState(0);

    const handleInput = value => {
        updateValue(id, value.target.files, true);
        setPhotosCount(value.target.files.length);
    };

    return (
        <div className={styles.file_container}>
            <input id='image-upload' onInput={value => handleInput(value)} multiple type='file' accept='image/*' hidden />
            <Button className={styles.file_button} variant='contained' color='cancel'>
                <label className={styles.file_label} htmlFor='image-upload'>
                    Upload Photos
                </label>
            </Button>
            {photosCount === 1 && <Typography>Photo uploaded</Typography>}
            {photosCount > 1 && <Typography>{photosCount} Photos uploaded</Typography>}
        </div>
    );
}
