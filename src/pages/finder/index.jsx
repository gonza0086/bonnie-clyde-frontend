// Components
import { Searchbar, Summary, Title } from '@/components';
import { Avatar, Grid, Stack } from '@mui/material';
import { green } from '@mui/material/colors';

export default function Finder() {
    return (
        <div className='container' style={{ width: 'fit-content' }}>
            <Title variant='title'>Find your partner</Title>
            <Searchbar />
            <Summary />
            <Summary />
            <Summary />
            <Summary />
        </div>
    );
}
