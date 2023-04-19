// Mui
import { Divider } from '@mui/material';

// Font
import localFont from 'next/font/local';
const alkatra = localFont({ src: '../assets/Alkatra-VariableFont_wght.ttf' });

export default function Title({ children }) {
    return (
        <div style={{ marginBottom: '1rem' }}>
            <h2 className={alkatra.className}>{children}</h2>
            <Divider variant='middle' />
        </div>
    );
}
