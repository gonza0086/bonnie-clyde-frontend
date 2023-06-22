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

export default function Finder() {
    const [data, setData] = useState([]);
    const { info } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleSearch = async searchValue => {
        try {
            let response = await fetch(`http://localhost:8080/search`, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + info.jwt.accessToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ search: searchValue }),
            });

            let json = await response.json();
            if (!response.ok) {
                throw new Error(json.message);
            }
            setData(json.result);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDecline = () => {
        dispatch(declineMatch());
    };

    const handleAccept = () => {
        dispatch(acceptMatch());
    };

    // if (receivedMatch) {
    //     return (
    //         <>
    //             <div
    //                 className='container'
    //                 style={{
    //                     width: '22vw',
    //                     height: 'fit-content',
    //                     margin: 'auto',
    //                     marginTop: '15%',
    //                     textAlign: 'center',
    //                 }}
    //             >
    //                 <Title tag='h5'>A match request was received by</Title>
    //                 <Divider style={{ marginTop: '0.5rem' }} />
    //                 <Summary
    //                     avatar={
    //                         <Avatar
    //                             sx={{
    //                                 bgcolor: nameToColor(`${receivedMatchBy.firstName} ${receivedMatchBy.lastName}`),
    //                                 color: 'black',
    //                                 marginRight: 1,
    //                                 width: 54,
    //                                 height: 54,
    //                             }}
    //                             alt={`${receivedMatchBy.id}_logo`}
    //                         >
    //                             {receivedMatchBy.firstName.charAt(0)}
    //                         </Avatar>
    //                     }
    //                     primaryText={`${receivedMatchBy.firstName} ${receivedMatchBy.lastName}`}
    //                 />
    //                 <Divider style={{ marginBottom: '1rem' }} />
    //                 <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
    //                     <Button variant='contained' color='cancel' onClick={handleDecline}>
    //                         Decline
    //                     </Button>
    //                     <Button variant='contained' color='secondary' onClick={handleAccept}>
    //                         Accept
    //                     </Button>
    //                 </div>
    //             </div>
    //         </>
    //     );
    // } else if (sentMatch) {
    //     return (
    //         <div
    //             className='container'
    //             style={{
    //                 width: '22vw',
    //                 height: 'fit-content',
    //                 margin: 'auto',
    //                 marginTop: '15%',
    //                 textAlign: 'center',
    //             }}
    //         >
    //             <Title tag='h5'>A match request was sent to</Title>
    //             <Divider style={{ marginTop: '0.5rem' }} />
    //             <Summary
    //                 avatar={
    //                     <Avatar
    //                         sx={{
    //                             bgcolor: nameToColor(`${sentMatchTo.firstName} ${sentMatchTo.lastName}`),
    //                             color: 'black',
    //                             marginRight: 1,
    //                             width: 54,
    //                             height: 54,
    //                         }}
    //                         alt={`${sentMatchTo.id}_logo`}
    //                     >
    //                         {sentMatchTo.firstName.charAt(0)}
    //                     </Avatar>
    //                 }
    //                 primaryText={`${sentMatchTo.firstName} ${sentMatchTo.lastName}`}
    //             />
    //             <Divider style={{ marginBottom: '1rem' }} />
    //             <Title tag='h5'>Waiting for response...</Title>
    //         </div>
    //     );
    // }

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
