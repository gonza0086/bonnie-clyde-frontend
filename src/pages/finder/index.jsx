// Components
import { Profile, ProfileSummary, Searchbar, Title } from '@/components';

// Mui
import { Stack } from '@mui/material';

// Faking API
const testUser = {
    name: 'Gonzalo Hernandez',
    sex: 'Male',
    country: 'Argentina',
    birdthday: 'August 12 2000',
};

export default function Finder() {
    return (
        <Stack direction='row' gap={48}>
            <div className='container' style={{ width: 'fit-content' }}>
                <Title variant='title'>Find your partner</Title>
                <Searchbar
                    onSearch={value => {
                        console.log(value);
                    }}
                />
                <ProfileSummary user={testUser} />
            </div>

            <div className='container'>
                <Profile />
            </div>
        </Stack>
    );
}
