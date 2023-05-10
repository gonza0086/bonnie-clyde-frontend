// Components
import { Summary } from '@/components';

import { Chip } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { useState } from 'react';

export default function PlanSummary({ plan, onClick }) {
    const handleClick = plan => {
        onClick(plan);
    };

    return (
        <Summary
            primaryText={plan.name}
            secondaryText={plan.createdBy}
            avatar={<CircleIcon color={plan.color} fontSize='small' />}
            onClick={() => handleClick(plan)}
        >
            {plan.tags.map(tag => (
                <Chip key={tag.label} label={tag.label} color={tag.color} />
            ))}
        </Summary>
    );
}
