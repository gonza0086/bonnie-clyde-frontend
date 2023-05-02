// Mui
import { AppBar, Button, Toolbar } from '@mui/material';

// Logo
import logo from '@/assets/logo.svg';

// Next
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Navbar() {
    const router = useRouter();

    const handleLogoClick = () => {
        router.push('/');
    };

    return (
        <AppBar position='static'>
            <Toolbar className='navbar'>
                <div className='navbar-logo-container'>
                    <Image src={logo} alt='Bonnie & Clyde Logo' fill onClick={handleLogoClick} />
                </div>
                <Button variant='contained' color='secondary'>
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
}
