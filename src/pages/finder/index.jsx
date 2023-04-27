import { Title } from '@/components';
import { IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Finder() {
    return (
        <>
            <div className='floating-container'>
                <Title>Finder</Title>
                <div className='search-input-container'>
                    <InputBase />
                    <IconButton type='button'>
                        <SearchIcon />
                    </IconButton>
                </div>
            </div>
        </>
    );
}
