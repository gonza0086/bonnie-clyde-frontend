// Mui
import { AppBar, Button, Toolbar } from '@mui/material';

// Logo
import logo from '@/assets/logo.svg';
import Image from 'next/image';

export default function Navbar() {
    return (
        <AppBar position='static'>
            <Toolbar className='navbar'>
                <div className='navbar-logo-container'>
                    <Image src={logo} alt='Bonnie & Clyde Logo' fill />
                </div>
                <Button variant='contained' color='secondary'>
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
}
