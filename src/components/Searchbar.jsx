// Mui
import { IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Styles
import styles from '../styles/Searchbar.module.css';

export default function Searchbar() {
    return (
        <div className={styles.searchInputContainer}>
            <InputBase className={styles.input} placeholder='test' />
            <IconButton className={styles.button} type='button'>
                <SearchIcon />
            </IconButton>
        </div>
    );
}
