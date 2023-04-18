// MUI
import { AppBar, Button, Toolbar } from '@mui/material';

export default function Navbar() {
    return (
        <AppBar position='static'>
            <Toolbar style={{ justifyContent: 'space-between' }}>
                <h3>Bonnie & Clyde</h3>
                <Button variant='contained' color='secondary'>
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
}
