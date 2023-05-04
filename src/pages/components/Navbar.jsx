// Mui
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

// Logo
import logo from '@/assets/logo.svg';

// Next
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Title } from '@/components';
import Link from 'next/link';

export default function Navbar() {
    const router = useRouter();

    const handleRouter = route => {
        router.push(route);
    };

    return (
        <AppBar position='static'>
            <Toolbar className='navbar'>
                <div className='navbar-logo-container'>
                    <Image src={logo} alt='Bonnie & Clyde Logo' fill onClick={() => handleRouter('/')} />
                </div>
                <ul>
                    <Link href='/plans' style={{ textDecoration: 'none' }}>
                        <Typography>Plans</Typography>
                    </Link>
                </ul>
                <Button variant='contained' color='secondary' onClick={() => handleRouter('/login')}>
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
}
