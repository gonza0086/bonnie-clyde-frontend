// Components
import Title from './Title';

// Mui
import { ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

export default function Summary({ children, avatar, primaryText, secondaryText, secondaryAction, onClick }) {
    const handleClick = () => {
        onClick();
    };

    return (
        <ListItem secondaryAction={secondaryAction} disablePadding>
            <ListItemButton onClick={handleClick}>
                <ListItemAvatar sx={{ minWidth: '32px' }}>{avatar}</ListItemAvatar>

                <ListItemText secondary={secondaryText}>
                    <Title tag='h6'>{primaryText}</Title>
                </ListItemText>

                <ListItemIcon sx={{ gap: 1, marginRight: '3%' }}>{children}</ListItemIcon>
            </ListItemButton>
        </ListItem>
    );
}
