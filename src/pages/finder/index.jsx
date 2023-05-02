// Components
import { Profile, ProfileSummary, Searchbar, Title } from '@/components';

// hooks
import { useState } from 'react';

// Mui
import { Stack } from '@mui/material';

// Faking API
const testUser = {
    id: 0,
    name: 'Gonzalo Hernandez',
    sex: 'Male',
    country: 'Argentina',
    birdthday: 'August 12 2000',
};

export default function Finder() {
    const [data, setData] = useState([]);
    const [showProfile, setShowProfile] = useState(false);
    const [userProfile, setUserProfile] = useState({});

    const handleSearch = searchValue => {
        if ('Gonzalo Hernandez'.includes(searchValue)) {
            setData([testUser]);
        } else {
            setData([]);
        }
    };

    const handleProfileSummaryClick = user => {
        setUserProfile(user);
        setShowProfile(true);
    };

    const handleClose = () => {
        setShowProfile(false);
        setUserProfile({});
    };

    const handleMatch = userId => {
        console.log(userId);
    };

    return (
        <Stack direction='row' gap={6}>
            <div className='container' style={{ width: '70vw', height: '80vh' }}>
                <Title variant='title'>Find your partner</Title>
                <Searchbar onSearch={handleSearch} />

                {data.map(user => (
                    <ProfileSummary key={user.id} user={user} onClick={handleProfileSummaryClick} onSubmit={handleMatch} />
                ))}
            </div>

            {showProfile && (
                <div className='container' style={{ height: '30vh' }}>
                    <Profile user={userProfile} onClose={handleClose} />
                </div>
            )}
        </Stack>
    );
}
