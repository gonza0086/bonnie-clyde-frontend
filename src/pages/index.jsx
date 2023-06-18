// Mui
import { Button } from '@mui/material';

// Next
import { useRouter } from 'next/router';

// Redux
import { useSelector } from 'react-redux';
import Finder from './components/Finder';

export default function Home() {
    const router = useRouter();
    const { authenticated, partner } = useSelector(state => state.user);

    const handleClick = () => {
        router.push('/signup');
    };

    if (partner) {
        router.push('/plans');
    } else if (authenticated) {
        return <Finder />;
    } else {
        return (
            <div style={{ width: 'fit-content', margin: '30vh auto' }}>
                <Button variant='contained' color='secondary' onClick={handleClick}>
                    Get Started
                </Button>
            </div>
        );
    }
}
