// Mui
import { Divider, Typography } from '@mui/material';

// Font
import localFont from 'next/font/local';
const alkatra = localFont({ src: '../assets/alkatra-VariableFont_wght.ttf' });

export default function Title({ children, variant }) {
    return (
        <div className='title'>
            <Typography variant='h4' className={alkatra.className}>
                {children}
            </Typography>
            <Divider variant={variant} />
        </div>
    );
}
