import { Title } from '@/components';
import { IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Finder() {
    return (
        <>
            <div className='floating-container'>
                <Title>Finder</Title>
                <div className='search-input-container' style={{ display: 'inline-flex' }}>
                    <InputBase
                        style={{
                            paddingInline: '0.5rem',
                            border: '0.5px solid var(--grey-500)',
                            borderRight: 'none',
                            borderRadius: '5px 0 0 5px',
                        }}
                        placeholder='test'
                    />
                    <IconButton type='button' style={{ borderRadius: '0 5px 5px 0', backgroundColor: 'var(--secondary-color)' }}>
                        <SearchIcon />
                    </IconButton>
                </div>
            </div>
        </>
    );
}
