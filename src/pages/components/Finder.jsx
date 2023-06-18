// Components
import { Profile, Summary, Searchbar, Title } from '@/components';

// hooks
import { useState } from 'react';

// Mui
import { Avatar, Button, Divider, List, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProfileSummary from './ProfileSummary';
import { nameToColor } from '@/utilites/selectColorsFromString';
import { acceptMatch, declineMatch } from '@/redux/slices/userSlice';

// Faking API
const testUser = {
    id: 0,
    firstName: 'Gonzalo',
    lastName: 'Hernandez',
    sex: 'Male',
    country: 'Argentina',
    birdthday: 'August 12 2000',
};

export default function Finder() {
    const [data, setData] = useState([testUser]);
    const { receivedMatch, receivedMatchBy, sentMatch, sentMatchTo } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleSearch = searchValue => {
        if ('Gonzalo Hernandez'.includes(searchValue)) {
            setData([testUser]);
        } else {
            setData([]);
        }
    };

    const handleDecline = () => {
        dispatch(declineMatch());
    };

    const handleAccept = () => {
        dispatch(acceptMatch());
    };

    if (receivedMatch) {
        return (
            <>
                <div
                    className='container'
                    style={{
                        width: '22vw',
                        height: 'fit-content',
                        margin: 'auto',
                        marginTop: '15%',
                        textAlign: 'center',
                    }}
                >
                    <Title tag='h5'>A match request was received by</Title>
                    <Divider style={{ marginTop: '0.5rem' }} />
                    <Summary
                        avatar={
                            <Avatar
                                sx={{
                                    bgcolor: nameToColor(`${receivedMatchBy.firstName} ${receivedMatchBy.lastName}`),
                                    color: 'black',
                                    marginRight: 1,
                                    width: 54,
                                    height: 54,
                                }}
                                alt={`${receivedMatchBy.id}_logo`}
                            >
                                {receivedMatchBy.firstName.charAt(0)}
                            </Avatar>
                        }
                        primaryText={`${receivedMatchBy.firstName} ${receivedMatchBy.lastName}`}
                    />
                    <Divider style={{ marginBottom: '1rem' }} />
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <Button variant='contained' color='cancel' onClick={handleDecline}>
                            Decline
                        </Button>
                        <Button variant='contained' color='secondary' onClick={handleAccept}>
                            Accept
                        </Button>
                    </div>
                </div>
            </>
        );
    } else if (sentMatch) {
        return (
            <div
                className='container'
                style={{
                    width: '22vw',
                    height: 'fit-content',
                    margin: 'auto',
                    marginTop: '15%',
                    textAlign: 'center',
                }}
            >
                <Title tag='h5'>A match request was sent to</Title>
                <Divider style={{ marginTop: '0.5rem' }} />
                <Summary
                    avatar={
                        <Avatar
                            sx={{
                                bgcolor: nameToColor(`${sentMatchTo.firstName} ${sentMatchTo.lastName}`),
                                color: 'black',
                                marginRight: 1,
                                width: 54,
                                height: 54,
                            }}
                            alt={`${sentMatchTo.id}_logo`}
                        >
                            {sentMatchTo.firstName.charAt(0)}
                        </Avatar>
                    }
                    primaryText={`${sentMatchTo.firstName} ${sentMatchTo.lastName}`}
                />
                <Divider style={{ marginBottom: '1rem' }} />
                <Title tag='h5'>Waiting for response...</Title>
            </div>
        );
    }

    return (
        <div className='container'>
            <Title variant='title'>Find your partner</Title>
            <Searchbar onSearch={handleSearch} />

            <Stack direction='row' gap={64}>
                <List sx={{ width: '40%' }}>
                    {data.map(user => (
                        <ProfileSummary key={user} user={user} />
                    ))}
                </List>
            </Stack>
        </div>
    );
}
