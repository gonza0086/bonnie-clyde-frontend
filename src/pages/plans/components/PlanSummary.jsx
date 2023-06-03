// Components
import { Summary } from '@/components';

// hooks
import { useState } from 'react';

// Mui
import { Button, Chip, Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import DeleteIcon from '@mui/icons-material/Delete';

// Utilities
import { stringToColor, tagToColor } from '@/utilites/selectColorsFromString';

export default function PlanSummary({ plan, onClick, onDelete }) {
    const [showDialog, setShowDialog] = useState(false);

    const handleClick = plan => {
        onClick(plan);
    };

    const handleDelete = () => {
        onDelete(plan.id);
        setShowDialog(false);
    };

    return (
        <>
            <Summary
                primaryText={plan.title}
                secondaryText={plan.createdBy}
                avatar={<CircleIcon color={plan.status === 1 ? 'success' : 'error'} fontSize='small' />}
                onClick={() => handleClick(plan)}
                secondaryAction={
                    <IconButton onClick={() => setShowDialog(true)}>
                        <DeleteIcon />
                    </IconButton>
                }
            >
                {plan.tags.map(tag => (
                    <Chip key={tag} label={tag} sx={{ backgroundColor: tagToColor(tag) }} />
                ))}
            </Summary>

            <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
                <DialogTitle>Are you sure to delete this plan?</DialogTitle>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button onClick={() => setShowDialog(false)} variant='contained' color='cancel'>
                        Cancel
                    </Button>
                    <Button color='error' variant='contained' onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
