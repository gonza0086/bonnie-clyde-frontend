//  Hooks
import { cloneElement, useState } from 'react';

// Mui
import { Button, Divider } from '@mui/material';

// utilities
import { initializeValueObject } from '@/utilites/initializeValue';

export default function Form({ children, onSubmit, onCancel, initialValues, divider, button = 'Submit', justifyContent = 'center' }) {
    const [values, setValues] = useState(initialValues);
    const [isValid, setIsValid] = useState(initializeValueObject(children));

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(values);
    };

    const handleValueUpdate = (id, newValue, isValueValid) => {
        setValues(prevValues => ({ ...prevValues, [id]: newValue }));
        setIsValid(prevIsValid => ({ ...prevIsValid, [id]: isValueValid }));
    };

    const isDisabled = () => {
        return Object.values(isValid).includes(false);
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <form onSubmit={handleSubmit}>
            {children.map(input => cloneElement(input, { key: input.props.id, updateValue: handleValueUpdate }))}
            <div style={{ marginTop: '1rem' }} />
            {divider && <Divider />}
            <div style={{ display: 'flex', justifyContent, gap: 5 }}>
                {onCancel && (
                    <Button className='form-button' variant='contained' color='cancel' onClick={handleCancel}>
                        Cancel
                    </Button>
                )}
                <Button className='form-button' type='submit' variant='contained' color='secondary' disabled={isDisabled()}>
                    {button}
                </Button>
            </div>
        </form>
    );
}
