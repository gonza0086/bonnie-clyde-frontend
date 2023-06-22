// Components
import Finder from './components/Finder';

// Mui
import { Button } from '@mui/material';

// Next
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

export default function Home() {
    const [partner, setPartner] = useState(false);
    const router = useRouter();
    const { info, authenticated } = useSelector(state => state.user);

    useEffect(() => {
        if (authenticated) {
            getPartner();
        }
    }, [authenticated, info.partner]);

    async function getPartner() {
        const res = await fetch('http://localhost:8080/partner', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + info.jwt.accessToken,
                'Content-Type': 'application/json',
            },
        });

        let json = await res.json();
        if (!res.ok) {
            return false;
        }
        setPartner(json.status);
    }

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
