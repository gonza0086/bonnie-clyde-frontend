// Components
import { Profile, ProfileSummary, Searchbar, Title } from '@/components';
import { Avatar, Divider, Stack, Typography } from '@mui/material';
import { green } from '@mui/material/colors';

export default function Finder() {
    return (
        <Stack direction='row' gap={48}>
            <div className='container' style={{ width: 'fit-content' }}>
                <Title variant='title'>Find your partner</Title>
                <Searchbar />
                <ProfileSummary />
            </div>

            <div className='container'>
                <Profile />
            </div>
        </Stack>
    );
}
