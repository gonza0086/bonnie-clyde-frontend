// Components
import { ProfileSummary, Searchbar, Title } from '@/components';
import { Chip, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';

// Fake API
const testPlan = {
    name: 'Paseo Jardin Japones',
    createdBy: 'Gonzalo Hernandez',
    color: 'success',
};

export default function Plans() {
    const handleSearch = search => {
        console.log(search);
    };

    const handleClick = plan => {
        console.log(plan.name);
    };

    return (
        <div className='container'>
            <Title variant='title'>Plans to do</Title>
            <Searchbar onSearch={handleSearch} />

            <List sx={{ width: '40%' }}>
                <ProfileSummary
                    primaryText={testPlan.name}
                    secondaryText={testPlan.createdBy}
                    avatar={<CircleIcon color={testPlan.color} fontSize='small' />}
                    onClick={() => handleClick(testPlan)}
                >
                    <Chip icon={<WbSunnyIcon fontSize='small' />} label='Dia' color='secondary' />
                    <Chip icon={<DirectionsWalkIcon fontSize='small' />} label='Paseo' color='primary' />
                </ProfileSummary>
            </List>
        </div>
    );
}
