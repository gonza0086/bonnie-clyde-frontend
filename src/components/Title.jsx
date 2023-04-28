// Mui
import { Divider, Typography } from '@mui/material';

// Font
import localFont from 'next/font/local';
const alkatra = localFont({ src: '../assets/alkatra-VariableFont_wght.ttf' });

export default function Title({ children, tag = 'h4', variant }) {
    return (
        <div className={variant}>
            <Typography variant={tag} className={alkatra.className}>
                {children}
            </Typography>
            {variant === 'title' && <Divider />}
        </div>
    );
}
