// Mui
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

// Logo
import logo from '@/assets/logo.svg';

// Next
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/slices/userSlice';

export default function Navbar() {
    const router = useRouter();
    const { authenticated } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleRouter = route => {
        router.push(route);
    };

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    };

    return (
        <AppBar position='static'>
            <Toolbar className='navbar'>
                <div className='navbar-logo-container'>
                    <Image src={logo} alt='Bonnie & Clyde Logo' fill onClick={() => handleRouter('/')} />
                </div>

                {authenticated && (
                    <>
                        <ul>
                            <Link href='/plans' style={{ textDecoration: 'none' }}>
                                <Typography>Plans</Typography>
                            </Link>
                        </ul>

                        <Button variant='contained' color='secondary' onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                )}

                {!authenticated && (
                    <Button variant='contained' color='secondary' onClick={() => handleRouter('/login')}>
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}
