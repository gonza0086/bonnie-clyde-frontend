// Mui
import { Button } from '@mui/material';

// Next
import { useRouter } from 'next/router';

// Redux
import { useSelector } from 'react-redux';
import Finder from './components/Finder';

export default function Home() {
    const router = useRouter();
    const { authenticated } = useSelector(state => state.user);

    const handleClick = () => {
        router.push('/signup');
    };

    if (authenticated) return <Finder />;

    return (
        <div style={{ width: 'fit-content', margin: '30vh auto' }}>
            <Button variant='contained' color='secondary' onClick={handleClick}>
                Get Started
            </Button>
        </div>
    );
}
