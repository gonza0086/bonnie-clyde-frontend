import { Summary } from '@/components';
import { sendMatch } from '@/redux/slices/userSlice';
import { nameToColor } from '@/utilites/selectColorsFromString';
import { Avatar, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function ProfileSummary({ user }) {
    const [matchedUser, setMatchedUser] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const dispatch = useDispatch();

    const handleMatchClick = user => {
        setMatchedUser(user);
        setShowDialog(true);
    };

    const handleMatch = () => {
        dispatch(sendMatch(matchedUser));
        setShowDialog(false);
    };

    return (
        <>
            <Summary
                key={user.id}
                avatar={
                    <Avatar
                        sx={{
                            bgcolor: nameToColor(`${user.firstName} ${user.lastName}`),
                            color: 'black',
                            marginRight: 1,
                            width: 54,
                            height: 54,
                        }}
                        alt={`${user.id}_logo`}
                    >
                        {user.firstName.charAt(0)}
                    </Avatar>
                }
                primaryText={`${user.firstName} ${user.lastName}`}
                secondaryAction={
                    <Button variant='contained' color='secondary' onClick={() => handleMatchClick(user)}>
                        Match
                    </Button>
                }
            />

            <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
                <DialogTitle>{`Are you sure to match with ${matchedUser.firstName} ${matchedUser.lastName}?`}</DialogTitle>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button onClick={() => setShowDialog(false)} variant='contained' color='cancel'>
                        Cancel
                    </Button>
                    <Button color='secondary' variant='contained' onClick={handleMatch}>
                        Match
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
