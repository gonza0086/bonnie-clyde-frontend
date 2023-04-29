// Hooks
import { useState } from 'react';

// Mui
import { IconButton, InputBase, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Styles
import styles from '../styles/Searchbar.module.css';

export default function Searchbar({ onSearch }) {
    const [searchInput, setSearchInput] = useState('');

    const handleChange = e => {
        setSearchInput(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSearch(searchInput);
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.searchInputContainer}>
                <InputBase value={searchInput} onChange={handleChange} className={styles.input} placeholder='Search' />
                <IconButton className={styles.button} type='submit' onClick={handleSubmit}>
                    <SearchIcon />
                </IconButton>
            </div>
        </form>
    );
}
