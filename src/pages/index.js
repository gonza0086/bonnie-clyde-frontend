import { AppBar, Button, Toolbar } from '@mui/material';

export default function Home() {
    return (
        <div>
            <AppBar position='static'>
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <h3>Title example</h3>
                    <p>Text example</p>
                    <Button variant='contained' color='secondary'>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            Bonnie & Clyde
        </div>
    );
}
