import { Button, TextField } from '@mui/material';

export default function Home() {
    return (
        <div
            style={{
                border: 'solid 1px black',
                width: '20vw',
                paddingBlock: '1em',
                paddingInline: '2em',
                margin: '10vh auto',
                textAlign: 'center',
            }}
        >
            <h3>Bonnie & Clyde</h3>
            <div style={{ paddingBlock: '0.7em' }} />
            <form>
                <TextField id='username' label='Username' variant='outlined' fullWidth />
                <div style={{ paddingBlock: '0.3em' }} />
                <TextField id='email' label='Email' variant='outlined' fullWidth />
                <div style={{ paddingBlock: '0.3em' }} />
                <TextField id='password' label='Password' variant='outlined' type='password' fullWidth />
                <div style={{ paddingBlock: '0.3em' }} />
                <TextField id='repeat-password' label='Repeat password' variant='outlined' type='password' fullWidth />
                <div style={{ paddingBlock: '1em' }} />
                <Button variant='contained' color='secondary'>
                    Signup
                </Button>
            </form>
        </div>
    );
}
