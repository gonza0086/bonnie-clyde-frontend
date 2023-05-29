import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { useState } from 'react';

export default function SelectInput({ options }) {
    const [selections, setSelections] = useState([]);
    const [newOption, setNewOption] = useState('');

    const handleChange = event => {
        const value = event.target.value;
        setSelections(typeof value === 'string' ? value.split(',') : value);
    };

    const handleNewOption = e => {
        if (e.key === 'Enter') {
            setSelections(prevSelections => [...prevSelections, newOption]);
            setNewOption('');
        }
    };

    const handleDelete = value => {
        setSelections(prevSelections => prevSelections.filter(selection => selection !== value));
    };

    return (
        <div style={{ display: 'flex', gap: '1%', marginBlock: '0.3rem' }}>
            <FormControl sx={{ width: '69%' }}>
                <InputLabel id='demo-multiple-chip-label' color='secondary'>
                    Tags
                </InputLabel>
                <Select
                    labelId='demo-multiple-chip-label'
                    id='demo-multiple-chip'
                    color='secondary'
                    multiple
                    value={selections}
                    onChange={handleChange}
                    input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
                    renderValue={selected => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }} onMouseDown={event => event.stopPropagation()}>
                            {selected.map(value => (
                                <Chip key={value} label={value} onDelete={() => handleDelete(value)} size='small' />
                            ))}
                        </Box>
                    )}
                >
                    {options.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                sx={{ width: '29%' }}
                id='new_option'
                value={newOption}
                placeholder='Write tag and press Enter'
                onChange={e => setNewOption(e.target.value)}
                onKeyDown={handleNewOption}
                color='secondary'
            />
        </div>
    );
}
