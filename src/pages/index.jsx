// Mui
import { Button } from '@mui/material';

// Next
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/signup');
    };

    return (
        <div style={{ width: 'fit-content', margin: '30vh auto' }}>
            <Button variant='contained' color='secondary' onClick={handleClick}>
                Get Started
            </Button>
        </div>
    );
}
