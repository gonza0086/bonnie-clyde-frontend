import { Summary } from '@/components';
import { match } from '@/redux/slices/userSlice';
import { nameToColor } from '@/utilites/selectColorsFromString';
import { Avatar, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ProfileSummary({ user }) {
    const [matchedUser, setMatchedUser] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const { info } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleMatchClick = user => {
        setMatchedUser(user);
        setShowDialog(true);
    };

    const handleMatch = async () => {
        setShowDialog(false);
        try {
            let response = await fetch(`http://localhost:8080/partner`, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + info.jwt.accessToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ to: matchedUser.id }),
            });

            let json = await response.json();
            if (!response.ok) {
                throw new Error(json.message);
            }
            dispatch(match(matchedUser.id));
        } catch (error) {
            console.log(error.message);
        }
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
