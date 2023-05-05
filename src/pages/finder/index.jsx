// Components
import { Profile, ProfileSummary, Searchbar, Title } from '@/components';

// hooks
import { useState } from 'react';

// Mui
import { Avatar, Button, List, Stack } from '@mui/material';
import { green } from '@mui/material/colors';

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
        <div className='container'>
            <Title variant='title'>Find your partner</Title>
            <Searchbar onSearch={handleSearch} />

            <Stack direction='row'>
                <List sx={{ width: '40%' }}>
                    {data.map(user => (
                        <ProfileSummary
                            key={user.id}
                            avatar={
                                <Avatar sx={{ bgcolor: green[500], marginRight: 1, width: 54, height: 54 }} alt={`${user.id}_logo`}>
                                    G
                                </Avatar>
                            }
                            primaryText={user.name}
                            secondaryText={`${user.country} | ${user.sex}`}
                            secondaryAction={
                                <Button variant='contained' color='secondary' onClick={() => handleMatch(user.id)}>
                                    Match
                                </Button>
                            }
                            onClick={() => handleProfileSummaryClick(user)}
                        />
                    ))}
                </List>

                {showProfile && <Profile user={userProfile} onClose={handleClose} />}
            </Stack>
        </div>
    );
}
